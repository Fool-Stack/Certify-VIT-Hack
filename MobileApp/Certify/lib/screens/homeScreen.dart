import 'package:Certify/animations/bounceIn.dart';
import 'package:Certify/screens/addParticipantsScreen.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:websafe_svg/websafe_svg.dart';
import 'package:bottom_sheet/bottom_sheet.dart';
import 'package:Certify/providers/globals.dart' as globals;

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  void _showSheet() {
    showFlexibleBottomSheet<void>(
      minHeight: 0,
      initHeight: 0.4,
      maxHeight: 0.8,
      context: context,
      builder: _buildBottomSheet,
      anchors: [0, 0.5, 1],
    );
  }

  String currentEvent = '';
  Widget _buildBottomSheet(
    BuildContext context,
    ScrollController scrollController,
    double bottomSheetOffset,
  ) {
    return SafeArea(
      child: Material(
        child: SingleChildScrollView(
          child: Container(
            height: double.maxFinite,
            child: Column(
              mainAxisSize: MainAxisSize.max,
              children: [
                Container(
                  width: double.infinity,
                  alignment: Alignment.topLeft,
                  padding: EdgeInsets.only(
                      left: MediaQuery.of(context).size.width * 6 / 100,
                      top: MediaQuery.of(context).size.height * 2 / 100),
                  child: Text(
                    'Add an event',
                    style: GoogleFonts.montserrat(
                      fontSize: 20,
                      color: Theme.of(context).primaryColor,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 2 / 100,
                ),
                Container(
                  margin: EdgeInsets.only(
                    left: MediaQuery.of(context).size.width * 6 / 100,
                    right: MediaQuery.of(context).size.width * 6 / 100,
                  ),
                  alignment: Alignment.center,
                  padding: EdgeInsets.only(
                    left: MediaQuery.of(context).size.width * 1 / 100,
                    right: MediaQuery.of(context).size.width * 1 / 100,
                    bottom: MediaQuery.of(context).size.height * 0.5 / 100,
                    top: MediaQuery.of(context).size.height * 0.1 / 100,
                  ),
                  width: double.infinity,
                  height: MediaQuery.of(context).size.height * 6 / 100,
                  decoration: BoxDecoration(
                    border: Border.all(color: Theme.of(context).accentColor),
                    borderRadius: BorderRadius.all(
                      Radius.circular(20),
                    ),
                  ),
                  child: TextFormField(
                    onChanged: (value) {
                      currentEvent = value;
                    },
                    cursorColor: Theme.of(context).accentColor,
                    decoration: InputDecoration(
                      prefixIcon: Icon(
                        FontAwesomeIcons.calendarAlt,
                        color: Theme.of(context).accentColor,
                      ),
                      border: InputBorder.none,
                      focusedBorder: InputBorder.none,
                      enabledBorder: InputBorder.none,
                      errorBorder: InputBorder.none,
                      disabledBorder: InputBorder.none,
                      hintText: "Add a name",
                      hintStyle: GoogleFonts.montserrat(
                        fontSize: MediaQuery.of(context).size.height * 2 / 100,
                        fontWeight: FontWeight.w300,
                        color: Theme.of(context).primaryColor,
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 2 / 100,
                ),
                Container(
                  margin: EdgeInsets.only(
                    left: MediaQuery.of(context).size.width * 6 / 100,
                    right: MediaQuery.of(context).size.width * 6 / 100,
                  ),
                  alignment: Alignment.center,
                  padding: EdgeInsets.only(
                    left: MediaQuery.of(context).size.width * 1 / 100,
                    right: MediaQuery.of(context).size.width * 1 / 100,
                    bottom: MediaQuery.of(context).size.height * 0.5 / 100,
                    top: MediaQuery.of(context).size.height * 0.1 / 100,
                  ),
                  width: double.infinity,
                  height: MediaQuery.of(context).size.height * 6 / 100,
                  decoration: BoxDecoration(
                    border: Border.all(color: Theme.of(context).accentColor),
                    borderRadius: BorderRadius.all(
                      Radius.circular(20),
                    ),
                  ),
                  child: TextFormField(
                    cursorColor: Theme.of(context).accentColor,
                    decoration: InputDecoration(
                      prefixIcon: Icon(
                        FontAwesomeIcons.key,
                        color: Theme.of(context).accentColor,
                      ),
                      border: InputBorder.none,
                      focusedBorder: InputBorder.none,
                      enabledBorder: InputBorder.none,
                      errorBorder: InputBorder.none,
                      disabledBorder: InputBorder.none,
                      hintText: "Admin Secret Key",
                      hintStyle: GoogleFonts.montserrat(
                        fontSize: MediaQuery.of(context).size.height * 2 / 100,
                        fontWeight: FontWeight.w300,
                        color: Theme.of(context).primaryColor,
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 3 / 100,
                ),
                Container(
                  margin: EdgeInsets.symmetric(
                    horizontal: MediaQuery.of(context).size.width * 25 / 100,
                  ),
                  height: MediaQuery.of(context).size.height * 8 / 100,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.all(
                      Radius.circular(20),
                    ),
                    color: Theme.of(context).accentColor,
                  ),
                  padding: EdgeInsets.all(
                    MediaQuery.of(context).size.height * 1 / 100,
                  ),
                  child: FlatButton(
                    onPressed: () {
                      setState(() {
                        globals.events.add(currentEvent);
                      });
                      Navigator.push(
                        context,
                        BounceIn(
                          widget: AddParticipantsScreen(),
                        ),
                      );
                    },
                    splashColor: Theme.of(context).accentColor,
                    child: Center(
                      child: Text(
                        "Create Event",
                        style: GoogleFonts.montserrat(
                          fontSize:
                              MediaQuery.of(context).size.height * 2 / 100,
                          fontWeight: FontWeight.w600,
                          color: Theme.of(context).backgroundColor,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Theme.of(context).backgroundColor,
      appBar: AppBar(
        actions: [
          IconButton(
            icon: Icon(
              FontAwesomeIcons.plus,
              color: Theme.of(context).accentColor,
            ),
            onPressed: () {
              _showSheet();
            },
          )
        ],
        automaticallyImplyLeading: false,
        backgroundColor: Theme.of(context).backgroundColor,
        title: WebsafeSvg.asset(
          'assets/svg/certify.svg',
          width: size.width * 30 / 100,
        ),
        elevation: 1,
      ),
      body: Stack(
        children: [
          Column(
            children: [
              Container(
                width: double.infinity,
                alignment: Alignment.topLeft,
                padding: EdgeInsets.only(
                    left: size.width * 6 / 100, top: size.height * 2 / 100),
                child: Text(
                  'My events',
                  style: GoogleFonts.montserrat(
                    fontSize: 20,
                    color: Theme.of(context).primaryColor,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              SizedBox(
                height: size.height * 2 / 100,
              ),
              Container(
                width: double.infinity,
                child: globals.events.length == 0
                    ? Container(
                        height: size.height * 10 / 100,
                        alignment: Alignment.center,
                        padding: EdgeInsets.all(size.height * 2 / 100),
                        child: Text(
                          'You dont have any events. Try to make one!',
                          style: GoogleFonts.montserrat(
                            fontSize: 11,
                            fontWeight: FontWeight.w100,
                          ),
                        ),
                      )
                    : Container(
                        height: size.height * 60 / 100,
                        width: double.maxFinite,
                        child: ListView.builder(
                          shrinkWrap: false,
                          scrollDirection: Axis.vertical,
                          itemCount: globals.events.length,
                          padding: EdgeInsets.symmetric(
                              horizontal: size.width * 6 / 100),
                          itemBuilder: (context, index) {
                            return Container(
                              height: size.height * 6 / 100,
                              decoration: BoxDecoration(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(10)),
                                color: Theme.of(context).accentColor,
                              ),
                              margin:
                                  EdgeInsets.only(bottom: size.width * 4 / 100),
                              alignment: Alignment.centerLeft,
                              padding: EdgeInsets.only(
                                left: size.width * 5 / 100,
                                right: size.width * 5 / 100,
                              ),
                              child: Text(
                                globals.events[index],
                                style: GoogleFonts.montserrat(
                                  color: Theme.of(context).primaryColor,
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            );
                          },
                        ),
                      ),
              )
            ],
          ),
        ],
      ),
    );
  }
}
