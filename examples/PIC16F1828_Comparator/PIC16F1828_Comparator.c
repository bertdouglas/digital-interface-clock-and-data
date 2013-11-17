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
// This very simple program shows how to setup a comparator on the PIC16F1828 and
// use the DAC to set the reference voltage for the comparator. We set the
// Fixed Voltage Reference (FVR) to 4.096V and use that for the the voltage source
// going into the DAC.  This will have the end result of limiting our comparator
// trip point to less than 4.096V, but the reference will be much more stable and
// repeatable than if you were to use the 5V Vdd level from a standard voltage
// regulator.
//
// The input for the Comparator
// The output of the comparator is connected thru a resistor to an LED so whenever
// the incoming signal level rises above the comparator trip poing (set by the DAC)
// then the LED will go on.  When the input level is less than the trip point then
// the LED will be off.
//
// Device: PIC16F1828
// Compiler: Microchip XC8 v1.12
// IDE: MPLAB X v1.7
// Created: May 2013
//
//
//            PIC16F1828
//    |--------------------------|
//    |        Analog input (RC1)| <-- analog input into comparator1
//    |                          |
//    |  Comparator1 output (RA2)| --> comparator1 output to LED (thru 300 Ohm resistor)
//    |                          |
//    |--------------------------|
//
//
//
//***************************************************************************************************** 

#include <xc.h>

#pragma config FOSC=INTOSC, PLLEN=OFF, MCLRE = ON, WDTE = OFF
#pragma config CPD = OFF, BOREN = OFF, IESO = OFF, FCMEN = OFF, LVP=OFF


#define _XTAL_FREQ      16000000         // this is used by the __delay_ms(xx) and __delay_us(xx) functions


//Globals

volatile unsigned int comp_flag;    // flag used to tell main routine that comparator has tripped

//*************************************************************************************
// Interrupt Service Routine
// Check uart receive bit and if it is what caused the interrupt, turn LED on and
// read the data from the uart receive buffer.
// Note there is only one ISR to handle all interrupts so you need to determine
// what caused the interrupt before taking action.
//*************************************************************************************
void interrupt ISR() {
    
    if (PIR2bits.C1IF) //check to see if the Comparator1 interrupt flag has been set
    {
        comp_flag=1;    // set flag
        PIR2bits.C1IF=0; // clear the interrupt flag
    }
}

//*************************************************************************************
// ******************************** Main Routine **************************************
//*************************************************************************************

void main ( ) 
{
    // set up oscillator
    OSCCONbits.SCS=0x02;    // select internal oscillator block
    OSCCONbits.SPLLEN=0;    // PLL disabled
    OSCCONbits.IRCF=0x0F;    // set oscillator speed as 16Mhz
    

    // PORT A Assignments
    TRISAbits.TRISA0 = 0;	// RA0 = nc
    TRISAbits.TRISA1 = 0;	// RA1 = nc
    TRISAbits.TRISA2 = 0;	// RA2 = --> Comparator1 output to LED (thru 300 Ohm resistor)
    TRISAbits.TRISA3 = 1;	// RA3 = nc (MCLR)
    TRISAbits.TRISA4 = 0;	// RA4 = nc
    TRISAbits.TRISA5 = 0;	// RA5 = nc

    ANSELA = 0x00;              // port A is all digital I/O

    // PORT B Assignments
    TRISBbits.TRISB4 = 0;	// RB4 = nc
    TRISBbits.TRISB5 = 0;	// RB5 = nc
    TRISBbits.TRISB6 = 0;	// RB6 = nc

    ANSELB = 0x00;              // port b is all digital I/O

    // PORT C Assignments
    TRISCbits.TRISC0 = 0;       // RC0 = nc
    TRISCbits.TRISC1 = 1;       // RC1 = Comparator 1 input (analog input)
    TRISCbits.TRISC2 = 0;	// RC2 = nc
    TRISCbits.TRISC3 = 1;	// RC3 = Comparator2 input (not used in this example)
    TRISCbits.TRISC4 = 0;	// RC4 = nc
    TRISCbits.TRISC5 = 0;	// RC5 = Comparator2 output (not used in this example)
    TRISCbits.TRISC6 = 0;	// RC6 = nc
    TRISCbits.TRISC7 = 0;	// RC7 = nc

    ANSELC = 0x00;              // leave all port c inputs as digital I/0

    
    



    //**********************************************************************************
    // First we wet up the Fixed Voltage Reference (FVR) which will be used as the
    // positive voltage source for the DAC.  Fun Fact: the FVR can also be used as
    // the Vref for the ADC.  Read the data sheet for more details
    //**********************************************************************************
    //FVRCONbits.CDAFVR=0x00;   // comparator/DAC fixed reference voltage is off
    //FVRCONbits.CDAFVR=0x01;   // comparator/DAC fixed reference voltage = 1.024V
    //FVRCONbits.CDAFVR=0x02;   // comparator/DAC fixed reference voltage = 2.048V
    FVRCONbits.CDAFVR=0x03;     // comparator/DAC fixed reference voltage = 4.096V
    FVRCONbits.FVREN=1;         // FVR enabled

    //**********************************************************************************
    // Now set up the DAC which will be used to set the 'trip point' for our comparator
    //**********************************************************************************
    // Note that you can choose from different sources for the DAC positive voltage source.
    // Choosing Vdd may get you a wider output range, but choosing the
    // FVR (Fixed Voltage Reference) will typically get you a much
    // more stable reference voltage than Vdd. The FVR can also be used as the Vref for
    // the ADC.  Read the section in the datasheet about the FVR for more details.
    //**********************************************************************************
    //
    DACCON0bits.DACOE=0;        // disable the DAC output pin (RA0).  If you are not
                                // using the RA0 pin for anything else you can enable this
                                // as being able to measure the DAC output can help
                                // in debugging

                                // Now set the DAC positive voltage source.
    //DACCON0bits.DACPSS=0x00;    // use this for DAC voltage source = VDD
    //DACCON0bits.DACPSS=0x01;   // use this for DAC voltage source = Vref pin (RA1)
    DACCON0bits.DACPSS=0x02;   // use this for DAC Voltage source = FVR
                                 

    // Now we are ready to set the DAC output voltage using the DACR register.
    // The DAC only has 32 output levels so only values from 0x00 up through
    // 0x1F ar valid for the DACR register.  In the table below we show typical
    // measured output values when the comparator tripped based on the
    // selection of Vref and the value in the DACR register.
    // Measurements were taken using plain ol' DVM.
    //
    //               Measured trip        Measured trip
    //                point with           point with
    //      DACR    Vref=FVR(4.096V)      Vref=Vdd (5V)
    //      ----    ----------------     --------------
    //      0x08        1.03 V              1.25 V
    //      0x10        2.06                2.49
    //      0x18        3.08                3.73 
    //      0x1C        3.60                4.35
    //      0x1F        3.98                4.83
    //
    //
    DACCON1bits.DACR=0x18;  // set DAC output level to your desired level (3.08V for this example)

    DACCON0bits.DACEN=1;        // turn DAC on
    //**********************************************************************************


    //**********************************************************************************
    // Setup comparator 1
    //**********************************************************************************
    // NOTE: Normally with a comparator you connect your reference voltage to the
    // inverting input and the voltage that you want to monitor to the non-inverting input.
    // However, in this example we are going to use the DAC as the non-inverting input
    // for our comparator, which means that the signal that we are monitoring
    // has to be connected to the inverting input of the comparator (RC1) so this is
    // backwards from what you would normally do. In normal operation the comparator
    // output will go high when the non-inverting input is above the inverting input.
    // But since we are switching the inputs, this is backwards from what we want -
    // but no worries - we just set the bit that flips the output polarity and we
    // are good to go.
    //**********************************************************************************
    CM1CON0bits.C1OE=1;         // comparator output is present on the C1OUT pin (connected to LED)
    CM1CON0bits.C1POL=1;        // Comparator output polarity IS inverted (see note above)
    CM1CON0bits.C1SP=1;         // Comparator operates in normal power, higher speed mode
    CM1CON0bits.C1HYS=0;        // Comparator hysteresis is disabled
    CM1CON0bits.C1SYNC=0;       // Comparator output operates asynchronously
    CM1CON0bits.C1ON=1;         // Turn comparator module on

                                // now set the source of the non-inverting comparator input
                                // which will be our reference input
    //CM1CON1bits.C1PCH=0x00;   // use this for comparator reference voltage coming from C1IN+ pin (RA0)
    CM1CON1bits.C1PCH=0x01;     // use this for comparator reference voltage coming from DAC
    //CM1CON1bits.C1PCH=0x02;   // use this for comparator reference voltage coming from FVR
    //CM1CON1bits.C1PCH=0x03;   // use this for comparator reference voltage coming from Vss

                                // now set the source of the inverting comparator input
                                // which is the signal we are monitoring
    //CM1CON1bits. C1NCH=0x00;  // use this if you want comparator input on the C1IN0- pin(RA1)
    CM1CON1bits.C1NCH=0x01;     // use this if you want comparator input on the C1IN1- pin(RC1)
    //CM1CON1bits.C1NCH=0x02;   // use this if you want comparator input on the C1IN2- pin(RC2)
    //CM1CON1bits.C1NCH=0x03;   // use this if you want comparator input on the C1IN3- pin(RC3)

                                // Now setup the interrupt if needed
    CM1CON1bits.C1INTP=1;       // if set, fire interrupt when comparator output goes high
    CM1CON1bits.C1INTN=0;       // if set, fire interrupt when comparator output goes low
    
    //**********************************************************************************
    // Uncomment these 4 lines of code if you want to use the interrupt when the
    // comparator is tripped.
    //**********************************************************************************
//    INTCONbits.PEIE=1;          // Enable peripheral interrupt
//    INTCONbits.GIE=1;           // enable global interrupt
//    PIE2bits.C1IE=1;            // enable the Comparator interrupt
//    comp_flag=0;                // clear our flag
    //**********************************************************************************

    
    //**********************************************************************************
    //***** main loop *****************
    //**********************************************************************************
    
    while(1)    // endless loop
    {

        // if you want to use the interrupt method to determine when the comparator
        // has tripped, uncomment out the 4 lines of code above where indicated.
        // When the interrupt fires the 'comp_flag' will be set.
        // 
        if (comp_flag)
        {
            //do whatever you need to do for your main routine here
            comp_flag=0;    // reset the flag
        }


        // OR...
        //
        //if you don't want to use the interrupt method you can poll the 
        // CMOUT (comparator 'mirror' bits) to see if they have tripped.
        //
        if (CMOUT > 0) // check comparator mirror output bits
        {
            //do whatever you need to do here for your main routine here
           
            
        }
        
        
    }


} 	// end of main routine





	
	
