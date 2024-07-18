#include <fstream> // Include for file operations
#include <sstream> // Include for stringstream
#include <iomanip> // Include for setprecision
#include "KrakenHashgraph.h"

using namespace std;

// Assuming other necessary includes and namespaces are already present...

//---------------------------------------------------------
// Procedure: OnNewMail()

bool KrakenHashgraph::OnNewMail(MOOSMSG_LIST &NewMail)
{
  AppCastingMOOSApp::OnNewMail(NewMail);

  ofstream outputFile("output.txt", ios::trunc); // Open file for truncating (clearing) and writing

  MOOSMSG_LIST::iterator p;

  for(p = NewMail.begin(); p != NewMail.end(); p++) {
    CMOOSMsg &msg = *p;

    string key = msg.GetKey();
    string sval = msg.GetString();

    // Write key-value pair to file
    outputFile << "'" << key << "' = '" << sval << "'" << endl;

    bool handled = false;
    if(key == "NODE_REPORT")
      handled = onNodeReport(sval);
    else if(key == "NODE_REPORT_LOCAL")
      handled = onNodeReportLocal(sval);
    else if(key == "DB_UPTIME"){
      dbtime = msg.GetDouble();
      handled = true;
    }
    else if(key == "DOA"){
      doa = msg.GetDouble();
      handled = true;
    }
    else if(key == "NAV_X"){
      nav_x = msg.GetDouble();
      handled = true;
    }
    else if(key == "NAV_Y"){
      nav_y = msg.GetDouble();
      handled = true;
    }
    if(!handled)
      reportRunWarning("Unhandled Mail: '" + key + "'");
  }

  // outputFile will automatically close when going out of scope

  return true;
}
