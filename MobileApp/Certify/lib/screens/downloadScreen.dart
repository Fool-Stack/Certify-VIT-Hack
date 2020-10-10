import 'package:Certify/animations/bounceIn.dart';
import 'package:Certify/screens/homeScreen.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

class DownloadScreen extends StatefulWidget {
  final List contacts;
  DownloadScreen({@required this.contacts});
  @override
  _DownloadScreenState createState() => _DownloadScreenState();
}

class _DownloadScreenState extends State<DownloadScreen> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Theme.of(context).backgroundColor,
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              width: double.infinity,
              alignment: Alignment.topLeft,
              padding: EdgeInsets.only(
                  left: size.width * 6 / 100, top: size.height * 5 / 100),
              child: Text(
                'Generated Certificates',
                style: GoogleFonts.montserrat(
                  fontSize: 20,
                  color: Theme.of(context).primaryColor,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            SizedBox(
              height: size.height * 5 / 100,
            ),
            Container(
              height: size.height * 60 / 100,
              width: double.maxFinite,
              child: ListView.builder(
                shrinkWrap: false,
                scrollDirection: Axis.vertical,
                itemCount: widget.contacts.length,
                padding: EdgeInsets.symmetric(horizontal: size.width * 6 / 100),
                itemBuilder: (context, index) {
                  return Container(
                    height: size.height * 6 / 100,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.all(Radius.circular(10)),
                      color: Theme.of(context).accentColor,
                    ),
                    margin: EdgeInsets.only(bottom: size.width * 4 / 100),
                    alignment: Alignment.centerLeft,
                    padding: EdgeInsets.only(
                      left: size.width * 5 / 100,
                      right: size.width * 5 / 100,
                    ),
                    child: Row(
                      children: [
                        Text(
                          widget.contacts[index],
                          style: GoogleFonts.montserrat(
                            color: Theme.of(context).primaryColor,
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Spacer(),
                        Icon(
                          FontAwesomeIcons.download,
                          size: 18,
                        )
                      ],
                    ),
                  );
                },
              ),
            ),
            SizedBox(
              height: size.height * 8 / 100,
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
                      widget: HomeScreen(),
                    ),
                  );
                },
                splashColor: Theme.of(context).accentColor,
                child: Center(
                  child: Text(
                    "Home Page",
                    style: GoogleFonts.montserrat(
                      fontSize: size.height * 2.2 / 100,
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
    );
  }
}
