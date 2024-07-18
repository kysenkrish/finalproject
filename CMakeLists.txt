#--------------------------------------------------------
# The CMakeLists.txt for:                       pKrakenHashgraph
# Author(s):                              Multiple Authors
#--------------------------------------------------------

SET(SRC
  KrakenHashgraph.cpp
  KrakenHashgraph_Info.cpp
  main.cpp
)

ADD_EXECUTABLE(pKrakenHashgraph ${SRC})

TARGET_LINK_LIBRARIES(pKrakenHashgraph
   ${MOOS_LIBRARIES}
   apputil
   mbutil
   m
   pthread)

