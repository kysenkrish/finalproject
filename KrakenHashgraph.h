/************************************************************/
/*    NAME: Multiple Authors                                              */
/*    ORGN: MIT, Cambridge MA                               */
/*    FILE: KrakenHashgraph.h                                          */
/*    DATE: December 29th, 1963                             */
/************************************************************/

#ifndef KrakenHashgraph_HEADER
#define KrakenHashgraph_HEADER

#include "MOOS/libMOOS/Thirdparty/AppCasting/AppCastingMOOSApp.h"

class KrakenHashgraph : public AppCastingMOOSApp
{
  public:
    KrakenHashgraph();
    ~KrakenHashgraph();

  protected: // Standard MOOSApp functions to overload  
    bool OnNewMail(MOOSMSG_LIST &NewMail);
    bool Iterate();
    bool OnConnectToServer();
    bool OnStartUp();

  protected: // Standard AppCastingMOOSApp function to overload 
    bool buildReport();

  protected:
    void registerVariables();

  private: // Configuration variables

  private: // State variables
    double            dbtime;

    double            doa;
    
    double            nav_x;
    double            nav_y;
};

#endif 
