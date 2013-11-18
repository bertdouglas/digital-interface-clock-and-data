/*------------------------------------------------------------------------------
project name:    Digital Interface - Clock And Data
intermediary:    getacoder.com
buyer id:        <Hilario>
provider id:     <bertdouglas> (George H. Douglas)
provider email:  georgehdouglas@gmail.com
start date:      12 November 2013 
*/

#include <xc.h>
#include <stdint.h>
#include <limits.h>
#include <stdbool.h>
#include <stddef.h>

/*------------------------------------------------------------------------------
Pin usage and configuration (PIC16F1826)


Device Pinout for 18 pin DIP
----------------------------

    ===========      ==================      ===========
     Other PIC         PIC pins and           Other PIC 
    use of note         Port usage           use of note
    ===========      ==================      ===========
                           _   _ 
                     A2  1| |_| |18  A1
                     A3  2|     |17  A0
                     A4  3|     |16  A7      OSC1
    MCLR-,VPP        A5  4|     |15  A6      OSC2
    VSS                  5|     |14          VDD
                     B0  6|     |13  B7      ICDDAT
                     B1  7|     |12  B6      ICDCLK
                     B2  8|     |11  B5
                     B3  9|_____|10  B4

    ===========      ==================      ===========



Application pin assignments
---------------------------

    ===   ====   ======     ===============================
    Pin   Port   Signal     Note
    ===   ====   ======     ===============================
     17    A0    PCD0       Parallel input from PC.
     18    A1    PCD1       "
      1    A2    PCD2       "
      2    A3    PCD3       "
      6    B0    PCD4       "
      7    B1    PCD5       "
      8    B2    PCD6       "
      9    B3    PCD7       "

      3    A4    ACK-       Acknowledge output to PC
      4    A5    DR         Data ready input from PC

     10    B4    CLK        Serial clock output
     11    B5    DATA       Serial data output

     14          VDD        Power
      5          VSS        Ground

     12    B6    ICDCLK     Reserved for in circuit debug
     13    B7    ICDDAT     "

     15    A6    OSC2       Reserved for external oscillator.
     16    A7    OSC1       "
    ===   ====   ======     ===============================


Port Register usage
-------------------

            +------+------+------+------+------+------+------+------+
    Bits    | A7   | A6   | A5   | A4   | A3   | A2   | A1   | A0   |
            +------+------+------+------+------+------+------+------+
    Use     |(none)|(none)| DR   | ACK- | PCD3 | PCD2 | PCD1 | PCD0 |
            +------+------+------+------+------+------+------+------+
    Dir     | in   | in   | out  | in   | in   | in   | in   | in   |
            +------+------+------+------+------+------+------+------+


            +------+------+------+------+------+------+------+------+
    Bits    | B7   | B6   | B5   | B4   | B3   | B2   | B1   | B0   |
            +------+------+------+------+------+------+------+------+
    Use     |(none)|(none)| DATA | CLK  | PCD7 | PCD6 | PCD5 | PCD4 |
            +------+------+------+------+------+------+------+------+
    Dir     | in   | in   | out  | out  | in   | in   | in   | in   |
            +------+------+------+------+------+------+------+------+

*/

/*------------------------------------------------------------------------------
set configuration words
*/

// options in alpha order
#pragma config            \
  BOREN    = ON     ,     \
  CLKOUTEN = OFF    ,     \
  CP       = OFF    ,     \
  CPD      = OFF    ,     \
  FCMEN    = OFF    ,     \
  FOSC     = INTOSC ,     \
  IESO     = OFF    ,     \
  LVP      = OFF    ,     \
  MCLRE    = OFF    ,     \
  PLLEN    = OFF    ,     \
  PWRTE    = OFF    ,     \
  STVREN   = OFF    ,     \
  WDTE     = OFF    ,     \
  WRT      = OFF

/*------------------------------------------------------------------------------
Primitive application domain I/O functions/macros

All input and output is done using these functions.
If it is necessary to reassign I/O pins, 
only these functions need to be changed.

The compiler is not able to optimize local variables into registers, or
to inline functions.  So I am using using macros instead, in some places.
*/

// configure once at power on
void device_configure(void) {

  // wait until HF PLL is stable
  // (see DS41391D page 66)
  bool ready = false;
  do {
    ready = 
      OSCSTATbits.HFIOFR   &&
      OSCSTATbits.HFIOFL   &&
      OSCSTATbits.HFIOFS;
  }
  while ( ! ready );

  // set clock (also known as FOSC) to 16 MHZ (see DS41391D page 56,65)
  OSCCONbits.IRCF = 0b1111;
  #define FOSC (16000000)

  // The PIC16 has four clocks per instruction cycle
  #define FCYC (FOSC/4)

  // for use internally by __delay_us() function
  #define _XTAL_FREQ (FOSC)

  // for use to scale arguments to _delay() function
  // ICPM = instruction cycles per microsecond
  #define ICPM (FCYC/1000000)

  // Timer0 pre-scale is set to give an overflow period of 1024 microseconds.
  // timer0 period = pre-scale*range/ICPM = 16*256/4 = 1024 microseconds
  // pre-scale = 1024 * ICPM / 256 = 16
  // Range is 256 because timer0 is an 8-bit counter.

  // timer0 pre-scale  (see DS41391D page 176)
  OPTION_REGbits.PS = 0b011;   // 16 instruction cycles (FCYC)

  // port A 
  TRISA = 0b11101111;
  LATA  = 0b00010000;   // 'ACK-' = 1  (inactive)

  // port B
  TRISB = 0b11001111;
  LATB  = 0b00000000;
}

// track long times coarsely in milliseconds (actually 1024 microseconds)
uint8_t timer_ms;  
void timer_keep(void) {
  // hardware counter has wrapped 
  // see file in this project:  examples/09_Timer0/timer0.c
  if (INTCONbits.TMR0IF) {
    // clear wrap flag
    INTCONbits.T0IF = 0;
    // update software counter
    timer_ms += 1;
  }
}

// get parallel data input from pc
#define pcd_data_in               \
  ((PORTA & 0b00001111) << 0) |   \
  ((PORTB & 0b00001111) << 4)

// check if data is ready
#define pcd_ready()   \
  PORTAbits.RA5

// acknowledgement hi/lo
#define pcd_ack_hi()   \
  LATAbits.LATA4 = 1
#define pcd_ack_lo()   \
  LATAbits.LATA4 = 0

// serial clock hi/lo
#define serial_clock_hi()   \
  LATBbits.LATB4 = 1
#define serial_clock_lo()   \
  LATBbits.LATB4 = 0

// serial data output
// LSB of d controls output
#define serial_data_out(_d)             \
  LATB =                                \
    ( PORTB         & 0b11011111 )  |   \
    ( (~((_d&1)-1)) & 0b00100000 )


/*------------------------------------------------------------------------------
Original specification from getacoder.com

Also see these files:
  specs/pic circuit.pdf
  specs/proposal.txt


Description

This project is about programming a PIC chip to provide a serial 
Clock and Data lines from an stream of 78 bytes that will be provided from a 
PC I/O port. The interface to the PC will be done with an 8 bit data bus and 
two control lines, DR (data ready) provided by the PC to indicate data is in 
the bus and an ACK line stroked by the PIC to indicate to the PC that data was 
received.

Once the PIC received the 78 bytes will start transmitting them serially at 
27 Khz with a frame and subframe structure. Will transmit them in about 99 msec 
and will have 80 msec to fetch the new frame of 78 bytes from the PC. This is 
the loop the PIC program will do.

Details of timming, frame structure and flow chart of PIC code will be added
here tomorrow. 

Additional information: Submitted on 10/30/2013 at 12:50 EDT

Here is the flowchart of the PIC code, the timing of the frame structure for 
the clock and data lines and an schematic diagram of the PIC interface to the 
rest of the circuit.

There is typo on the first waveform of the timing diagram. All three values 
indicated are actualy microseconds, not miliseconds as show. So the actual 
sub-frame duration is 2.276 ms. The off-time as indicated here is 10 - 85 ms; 
we will use 80 msec. And finally the time of transmission then will be 99 msec.
 That is the size of the frame. 
*/

/*------------------------------------------------------------------------------
Serial Output Timing

This is an interpretation, elaboration and normalization of the specification.
All times are in microseconds.

It is arranged so that there can be a simple hierarchy of functions which can 
be conveniently combined and composed to generate the output bit stream.  

The original specification was not uniform.  For example, it showed delay
between elements of a group, but not after the last element in a group.
This makes for a lot of special cases in the code, which are better to avoid.


Level 0 framing, 1 byte, frame0/frm0  (not named in spec)
---------------------------------------------------------

  Bit            0   1   2   3   4   5   6   7
                    ___     _______     ___
  Data=0x5a  XX____|   |___|       |___|   |___XXXX
                  _   _   _   _   _   _   _   _
  Clock      ____| |_| |_| |_| |_| |_| |_| |_| |___

  Tframe0      |<----------- 296   uS -------->|
  Tbit             |<->|----  37   uS
  Tsetup       --->| |<-----  18.5 uS
  Thold          --->| |<---  18.5 uS

  Tframe0 = T0 * 16
  Tbit    = T0 *  2
  Tsetup  = T0
  Thold   = T0
  T0      = 18.5uS

  Data is changed on the falling clock edge.
  Data should be latched by the receiver on the rising edge of the clock.

  Note:  
    The value corresponding to Tframe0 on the specification is shown 
    graphically as covering only 15*T0, instead of 16*T0.  This is taken 
    to be an error in the specification, because it is inconsistent with
    the fact that 37 * 8 = 296, which is also shown on the specification.
   
    

Level 1 framing, 6 bytes, frame1/frm1 (called subframe in spec)
---------------------------------------------------------------

  Frame0             0         1         2         3         4         5

  Data/Clock    __|frm0|____|frm0|____|frm0|____|frm0|____|frm0|____|frm0|____

  Tframe0         |<-->|---------  296 uS
  Tframe0_gap          |<-->|----  100 uS
  T1              |<------->|----  396 us
  Tframe1         |<------------- 2376 uS ----------------------------------->|

  T1 = Tframe0 + Tframe0_gap
  Tframe1 = T1 * 6



Level 2 framing, 36 bytes, frame2 (not named in spec)
-----------------------------------------------------

  Frame1             0         1         2         3         4         5

  Data/Clock    __|frm1|____|frm1|____|frm1|____|frm1|____|frm1|____|frm1|____

  Tframe1         |<-->|---------  2376 uS
  Tframe1_gap          |<-->|----  1500 uS
  T2              |<------->|----  3876 us
  Tframe2         |<------------- 23256 uS ---------------------------------->|

  T2 = Tframe1 + Tframe1_gap
  Tframe2 = T2 * 6



Level 3 framing, 78 bytes, frame3 (not named in spec)
--------------------------------------------------------

  Frame0          [0...35]    [36..71]    [72..77]
  Frame1          [0....5]    [ 6..11]    [  12  ]

  Data/Clock    __|frame2|____|frame2|____|frame1|____________

  Tframe2         |<---->|--------------------------------------- 23256 uS
  Tframe2_gap            |<-->|---------------------------------- 27000 uS
  T3              |<--------->|---------------------------------- 50256 uS
  T2                                      |<---------->|---------  3876 uS
  Tframe3         |<---------------------------------->|-----

  T3 = Tframe2 + Tframe2_gap
  Tframe3 = (T3 * 2) + (T2 * 1) 



Level 4 framing, frame4 (called frame in spec)
-------------------------------------------

  Frame0/Bytes    [0..77]         [78..155]       [156..233]

  Data/Clock    __|frame3|________|frame3|________|frame3|________ ......

  Tframe3         |<---->|-------------
  Tframe3_gap            |<------>|----
  T4/Tframe4      |<------------->|----

  T4 = Tframe3 + Tframe3_gap
  Tframe4 = T4 * 1

  Frame4 repeats without end.

*/

// Independent timing constants

// FIXME temporary for testing
#define T0 (18.5)
#define Tframe0_gap (100)
#define Tframe1_gap (1000)
#define Tframe2_gap (10000)
#define Tframe3_gap (100000)


// Derived timing constants


/*------------------------------------------------------------------------------
global data buffer

Used for both input and output.
*/

#define DATA_BUF_SIZE 78
uint8_t   data_buf[DATA_BUF_SIZE];
uint8_t * data_ptr;

/*------------------------------------------------------------------------------
Serial output functions

Times with offsets were adjusted with the stopwatch feature
in the simulator.
*/

// convert microseconds to instruction cycles
#define m2i(_m)          \
  ((uint32_t)(_m*ICPM))

void frame0(void) {
  uint8_t d,n;
  d = *data_ptr++;
  n = 8;
  do {
    serial_data_out(d);
    _delay(m2i(T0)-18);
    serial_clock_hi();
    d >>= 1;
    n -= 1;
    _delay(m2i(T0)-6);
    serial_clock_lo();
  }
  while (n);

  serial_data_out(0);
}

void frame1(void) {
  uint8_t n;
  for ( n=6; n!=0; n-- ) {
    frame0();  _delay(m2i(Tframe0_gap)-104);
  }
}

void frame2(void) {
  uint8_t n;
  for ( n=6; n!=0; n-- ) {
    frame1();  _delay(m2i(Tframe1_gap)-0);
  }
}

void frame3(void) {
  frame2();  _delay(m2i(Tframe2_gap)-0);
  frame2();  _delay(m2i(Tframe2_gap)-0);
  frame1();  _delay(m2i(Tframe1_gap)-0);
}


/*------------------------------------------------------------------------------
Top level loop
*/

void main(void) {
  
  for (;;) {
    __delay_us(Tframe3_gap);
    data_ptr = &data_buf;
    frame3();
  }

}









