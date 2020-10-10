import 'package:Certify/animations/bounceIn.dart';
import 'package:Certify/screens/chooseTemplate.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

class AddParticipantsScreen extends StatefulWidget {
  @override
  _AddParticipantsScreenState createState() => _AddParticipantsScreenState();
}

class _AddParticipantsScreenState extends State<AddParticipantsScreen> {
  List contacts = [];
  int numberofparticipants = 0;
  String currentMail = '';
  TextEditingController contact = TextEditingController();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Theme.of(context).backgroundColor,
      body: SingleChildScrollView(
        child: Stack(
          children: [
            Column(
              children: [
                Container(
                  width: double.infinity,
                  alignment: Alignment.topLeft,
                  padding: EdgeInsets.only(
                      left: size.width * 6 / 100, top: size.height * 5 / 100),
                  child: Text(
                    'Add participants',
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
                  child: contacts.length == 0
                      ? Container(
                          height: size.height * 6 / 100,
                          alignment: Alignment.center,
                          padding: EdgeInsets.all(size.height * 2 / 100),
                          child: Text(
                            'You have $numberofparticipants' + ' participants.',
                            style: GoogleFonts.montserrat(
                              fontSize: 11,
                              fontWeight: FontWeight.w100,
                            ),
                          ),
                        )
                      : Column(
                          children: [
                            Container(
                              height: size.height * 6 / 100,
                              alignment: Alignment.center,
                              padding: EdgeInsets.all(size.height * 2 / 100),
                              child: Text(
                                'You have $numberofparticipants' +
                                    ' participants.',
                                style: GoogleFonts.montserrat(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w400,
                                ),
                              ),
                            ),
                            Container(
                              height: size.height * 6 / 100,
                              width: double.maxFinite,
                              child: ListView.builder(
                                shrinkWrap: false,
                                scrollDirection: Axis.horizontal,
                                itemCount: contacts.length,
                                padding: EdgeInsets.symmetric(
                                    horizontal: size.width * 6 / 100),
                                itemBuilder: (context, index) {
                                  return Container(
                                    alignment: Alignment.center,
                                    padding: EdgeInsets.symmetric(
                                      horizontal: size.width * 2 / 100,
                                    ),
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.all(
                                        Radius.circular(10),
                                      ),
                                      color: Theme.of(context).accentColor,
                                    ),
                                    margin: EdgeInsets.only(
                                      right: size.width * 2 / 100,
                                    ),
                                    child: Row(
                                      children: [
                                        Container(
                                          child: Text(
                                            contacts[index],
                                            style: GoogleFonts.montserrat(
                                              fontSize: 16,
                                              fontWeight: FontWeight.w500,
                                            ),
                                          ),
                                        ),
                                        IconButton(
                                          icon: Icon(
                                            FontAwesomeIcons.times,
                                            color: Colors.red,
                                          ),
                                          onPressed: () {
                                            setState(() {
                                              contacts.removeAt(index);
                                              if (numberofparticipants != 0) {
                                                numberofparticipants--;
                                              }
                                            });
                                          },
                                        )
                                      ],
                                    ),
                                  );
                                },
                              ),
                            ),
                          ],
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
                    controller: contact,
                    onChanged: (value) {
                      currentMail = value;
                    },
                    cursorColor: Theme.of(context).accentColor,
                    decoration: InputDecoration(
                      prefixIcon: Icon(
                        FontAwesomeIcons.envelope,
                        color: Theme.of(context).accentColor,
                      ),
                      border: InputBorder.none,
                      focusedBorder: InputBorder.none,
                      enabledBorder: InputBorder.none,
                      errorBorder: InputBorder.none,
                      disabledBorder: InputBorder.none,
                      hintText: "Add a participant's Email ID",
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
                  child: FlatButton(
                    onPressed: () {
                      setState(() {
                        contacts.add(currentMail);
                        numberofparticipants++;
                        contact.clear();
                      });
                    },
                    splashColor: Theme.of(context).accentColor,
                    child: Center(
                      child: Text(
                        "Add",
                        style: GoogleFonts.montserrat(
                          fontSize:
                              MediaQuery.of(context).size.height * 2 / 100,
                          fontWeight: FontWeight.w600,
                          color: Theme.of(context).accentColor,
                        ),
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  height: size.height * 30 / 100,
                ),
                Container(
                  margin: EdgeInsets.symmetric(
                    horizontal: size.width * 25 / 100,
                  ),
                  height: size.height * 8 / 100,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.all(
                      Radius.circular(20),
                    ),
                    color: Theme.of(context).accentColor,
                  ),
                  padding: EdgeInsets.all(
                    size.height * 1 / 100,
                  ),
                  child: FlatButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        BounceIn(
                          widget: ChooseTemplateScreen(
                            contacts: contacts,
                          ),
                        ),
                      );
                    },
                    splashColor: Theme.of(context).accentColor,
                    child: Center(
                      child: Text(
                        "Choose Template",
                        style: GoogleFonts.montserrat(
                          fontSize: size.width * 4 / 100,
                          fontWeight: FontWeight.w600,
                          color: Theme.of(context).backgroundColor,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
