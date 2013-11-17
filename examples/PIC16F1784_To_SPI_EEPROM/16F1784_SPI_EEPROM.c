//  Software License Agreement
//
// The software supplied herewith by Microchip Technology Incorporated (the "Company")
// for its PICmicro® Microcontroller is intended and supplied to you, the Company?s
// customer, for use solely and exclusively on Microchip PICmicro Microcontroller
// products.
//
// The software is owned by the Company and/or its supplier, and is protected under
// applicable copyright laws. All rights are reserved. Any use in violation of the
// foregoing restrictions may subject the user to criminal sanctions under applicable
// laws, as well as to civil liability for the breach of the terms and conditions of
// this license.
//
// THIS SOFTWARE IS PROVIDED IN AN "AS IS" CONDITION. NO WARRANTIES, WHETHER EXPRESS,
// IMPLIED OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE APPLY TO THIS SOFTWARE. THE
// COMPANY SHALL NOT, IN ANY CIRCUMSTANCES, BE LIABLE FOR SPECIAL, INCIDENTAL OR
// CONSEQUENTIAL DAMAGES, FOR ANY REASON WHATSOEVER.

//**********************************************************************************
// This very simple program shows how to communicate between PIC16F1784 and a 128K SPI
// Serial EEPROM (25LC128) using the MSSP port on the PICmicro.  Ten bytes of data
// are written to the SEE and then those bytes are read back into an array.
//
//
// Device: PIC16F1784 --> 25LC128
// Compiler: Microchip XC8 v1.12
// IDE: MPLAB X v1.7
// Created: May 2013

// 
// **********************************************************************************
#include <xc.h> // include standard header file


// Set Config bits - we are using internal oscillator
#pragma config FOSC=INTOSC, PLLEN=OFF, MCLRE=ON, WDTE=OFF
#pragma config LVP=OFF, CLKOUTEN=OFF,


// Definitions
#define _XTAL_FREQ  16000000        // this is used by the __delay_ms(xx) and __delay_us(xx) functions

#define SEE_WP      LATCbits.LATC1	// Write Protect Pin on Serial EEPROM
#define SEE_CS      LATCbits.LATC2	// Chip Select Pin on Serial EEPROM

//**************************************************************************************
// Send one byte to SEE
//**************************************************************************************
void WriteSPI(unsigned int databyte)
{
    //unsigned int buffer;
    //buffer = SSPBUF;            // Read the buffer to clear any remaining data and clear the buffer full bit
    PIR1bits.SSP1IF=0;          // clear SSP interrupt bit
    SSPBUF = databyte;          // Write data byte to the buffer to initiate transmission
    while(!PIR1bits.SSP1IF);    // Wait for interrupt flag to go high indicating transmission is complete
}

//**************************************************************************************
// Read one byte from SEE
//**************************************************************************************
unsigned int ReadSPI(void)
{
    unsigned int databyte;

    PIR1bits.SSP1IF=0;          // Clear SSP interrupt bit
    SSPBUF = 0x00;              // Write dummy data byte to the buffer to initiate transmission
    while(!SSPSTATbits.BF);     // Wait for interrupt flag to go high indicating transmission is complete
    databyte = SSPBUF;          // Read the incoming data byte
    return (databyte);
}
//*************************************************************************************
// Read the Status Register from the SEE
//**************************************************************************************
unsigned int Read_SPI_StatusReg(void)
{
    unsigned int data_read;

    SEE_CS=0;
    WriteSPI(0x05);         // Send read status register command
    data_read = ReadSPI();  // Read the data
    SEE_CS=1;

    return(data_read);
}

//**************************************************************************************
// Write one byte of data to the SEE
//**************************************************************************************
void Write_SPI_Byte(unsigned int address_hi,unsigned int address_lo,unsigned int data)
{
    unsigned int StatusReg;

    SEE_CS=0;
    WriteSPI(0x06);         // Send the set write enable latch command
    SEE_CS=1;
    __delay_us(10);

    SEE_CS=0;
    WriteSPI(0x02);         // Send write command
    WriteSPI(address_hi);   // Send high address byte
    WriteSPI(address_lo);   // Send low address byte
    WriteSPI(data);         // Send data byte
    SEE_CS=1;

    // At this point you can just wait the maximum write cycle time (5ms)
    // OR you can poll the WIP bit in the Status Register and wait for it
    // to go low.

    do  // using polling method
    {
        StatusReg = (Read_SPI_StatusReg() & 0x01);   // Read the Status Register and mask out   
    } while (StatusReg);                             // the WIP bit (bit 0)

    // __delay_ms(5);          // If you don't want to use the polling method you can
                              // just wait for the max write cycle time (5ms)
}

//**************************************************************************************
// Read one byte of data from the SEE
//**************************************************************************************
unsigned char Read_SPI_Byte(unsigned int address_hi,unsigned int address_lo)
{
	unsigned char data_read;

	SEE_CS=0;
	WriteSPI(0x03);         // Send read command
	WriteSPI(address_hi);   // Send high address
	WriteSPI(address_lo);   // Send Low address byte
	data_read = ReadSPI();  // Read the data
	SEE_CS=1;
	return(data_read);
}


//*************************************************************************************
void main() {

    unsigned int eeprom_addr_hi;
    unsigned int eeprom_addr_lo;
    unsigned int eeprom_array[20];
    unsigned int i;
    

    // set up oscillator control register
    OSCCONbits.IRCF = 0x0F; //set OSCCON IRCF bits to select OSC frequency=16Mhz
    OSCCONbits.SCS = 0x02; //set the SCS bits to select internal oscillator block
 
    //	PORT C Assignments
    TRISCbits.TRISC0 = 0; // RC0 = nc
    TRISCbits.TRISC1 = 0; // RC1 = output to SEE WP Pin
    TRISCbits.TRISC2 = 0; // RC2 = output to SEE CS Pin
    TRISCbits.TRISC3 = 0; // RC3 = SCK output SEE
    TRISCbits.TRISC4 = 1; // RC4 = SDI input from SEE
    TRISCbits.TRISC5 = 0; // RC5 = SDO output to SEE
    TRISCbits.TRISC6 = 0; // RC6 = nc
    TRISCbits.TRISC7 = 0; // RC7 = nc

    SEE_WP = 1; // set write protect pin high (allow writes)
    SEE_CS = 1; // disable SEE for now

    //**********************************************************************************
    // Setup SPI as Master mode, Mode 00 and clock rate of Fosc/16
    //**********************************************************************************
    // Note: current version of the XC8 compiler (v1.12)  uses the designator "SSPCON" for the
    // first MSSP control register, however, future versions of the compiler may use
    // "SSPCON1" or another variant. If you get errors for this register below
    // this is probably the reason.
    //**********************************************************************************

    SSPCONbits.SSPM=0x01;       // SPI Master mode, clock = Fosc/16 (1 Mhz)
    SSPCONbits.CKP=0;           // Idle state for clock is low
    SSPSTATbits.CKE=1;          // Transmit occurs on transition from active to idle clock state
    SSPSTATbits.SMP=0;          // Data is sampled at middle of data output time
    SSPCONbits.SSPEN=0x01;      // Enable SPI Port

    eeprom_addr_hi=0;           // reset address pointers to zero
    eeprom_addr_lo=0;


    // Now write 10 bytes of data starting at address 0x00
    // Data starts at 0x00 and increments by 1 each byte
    for (i=0;i<=10;i++)
    {
        Write_SPI_Byte(eeprom_addr_hi,eeprom_addr_lo,i);
        eeprom_addr_lo++;
    }

    eeprom_addr_hi=0;   // reset address pointers
    eeprom_addr_lo=0;

    // Now read back the data into an array
    for (i=0;i<=10;i++)
    {
        eeprom_array[i] = Read_SPI_Byte(eeprom_addr_hi,eeprom_addr_lo);
        eeprom_addr_lo++;
    }

    while (1); //just sit here
    


}








