import 'package:Certify/animations/bounceIn.dart';
import 'package:Certify/animations/bounceOut.dart';
import 'package:Certify/providers/reg.dart';
import 'package:Certify/screens/homeScreen.dart';
import 'package:Certify/screens/loginScreen.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:websafe_svg/websafe_svg.dart';

class SignUpPage extends StatefulWidget {
  @override
  _SignUpPageState createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  bool _isHidden = true;
  bool _isLoading = false;
  final GlobalKey<FormState> _formKey = GlobalKey();
  Map<String, String> _data = {};
  final String assetName = 'assets/svg/certify.svg';
  Future<void> _submit() async {
    setState(() {
      _isLoading = true;
    });
    if (!_formKey.currentState.validate()) {
      return;
    }
    _formKey.currentState.save();
    try {
      await Provider.of<Reg>(context, listen: false).signup(_data);
      Navigator.push(
        context,
        BounceIn(
          widget: HomeScreen(),
        ),
      );
    } catch (error) {
      await showDialog(
        context: context,
        child: AlertDialog(
          title: Text('Error'),
          content: Text('Signup Failed'),
        ),
      );
    }
    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return Scaffold(
      body: Stack(
        children: [
          Container(
            height: double.infinity,
            width: double.infinity,
            color: Theme.of(context).backgroundColor,
          ),
          Container(
            padding: EdgeInsets.only(top: size.height * 10 / 100),
            child: WebsafeSvg.asset(
              'assets/svg/certify.svg',
              width: size.width * 80 / 100,
            ),
            width: double.infinity,
          ),
          SingleChildScrollView(
            child: Form(
              key: _formKey,
              child: Column(
                children: [
                  SizedBox(
                    height: size.height * 4 / 100,
                  ),
                  Container(
                    width: double.infinity,
                    alignment: Alignment.centerLeft,
                    padding: EdgeInsets.only(left: size.width * 4 / 100),
                    child: IconButton(
                      icon: Icon(
                        FontAwesomeIcons.arrowLeft,
                        color: Theme.of(context).accentColor,
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          BounceOut(
                            widget: LoginScreen(),
                          ),
                        );
                      },
                    ),
                  ),
                  SizedBox(
                    height: size.height * 14 / 100,
                  ),
                  Container(
                    width: double.infinity,
                    alignment: Alignment.centerLeft,
                    padding: EdgeInsets.only(left: size.width * 8 / 100),
                    child: Text(
                      "Sign Up",
                      style: GoogleFonts.montserrat(
                        fontSize: size.height * 5 / 100,
                        fontWeight: FontWeight.w400,
                        color: Theme.of(context).accentColor,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: size.height * 5 / 100,
                  ),
                  Container(
                    margin: EdgeInsets.only(
                      left: size.width * 8 / 100,
                      right: size.width * 8 / 100,
                    ),
                    alignment: Alignment.center,
                    padding: EdgeInsets.only(
                      left: size.width * 1 / 100,
                      right: size.width * 1 / 100,
                      bottom: size.height * 0.5 / 100,
                      top: size.height * 0.1 / 100,
                    ),
                    width: double.infinity,
                    height: size.height * 6 / 100,
                    decoration: BoxDecoration(
                      border: Border.all(color: Theme.of(context).accentColor),
                      borderRadius: BorderRadius.all(
                        Radius.circular(20),
                      ),
                    ),
                    child: TextFormField(
                      onSaved: (value) {
                        _data['name'] = value;
                      },
                      keyboardType: TextInputType.emailAddress,
                      validator: (value) {
                        if (value == '') {
                          return 'This field is empty';
                        } else {
                          return null;
                        }
                      },
                      cursorColor: Theme.of(context).accentColor,
                      decoration: InputDecoration(
                        prefixIcon: Icon(
                          FontAwesomeIcons.userAlt,
                          color: Theme.of(context).accentColor,
                        ),
                        border: InputBorder.none,
                        focusedBorder: InputBorder.none,
                        enabledBorder: InputBorder.none,
                        errorBorder: InputBorder.none,
                        disabledBorder: InputBorder.none,
                        hintText: "Name",
                        hintStyle: GoogleFonts.montserrat(
                          fontSize: size.height * 2 / 100,
                          fontWeight: FontWeight.w300,
                          color: Theme.of(context).primaryColor,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: size.height * 2 / 100,
                  ),
                  Container(
                    margin: EdgeInsets.only(
                      left: size.width * 8 / 100,
                      right: size.width * 8 / 100,
                    ),
                    alignment: Alignment.center,
                    padding: EdgeInsets.only(
                      left: size.width * 1 / 100,
                      right: size.width * 1 / 100,
                      bottom: size.height * 0.5 / 100,
                      top: size.height * 0.1 / 100,
                    ),
                    width: double.infinity,
                    height: size.height * 6 / 100,
                    decoration: BoxDecoration(
                      border: Border.all(color: Theme.of(context).accentColor),
                      borderRadius: BorderRadius.all(
                        Radius.circular(20),
                      ),
                    ),
                    child: TextFormField(
                      onSaved: (value) {
                        _data['email'] = value;
                      },
                      keyboardType: TextInputType.emailAddress,
                      validator: (value) {
                        if (value == '') {
                          return 'This field is empty';
                        } else {
                          return null;
                        }
                      },
                      cursorColor: Theme.of(context).accentColor,
                      decoration: InputDecoration(
                        prefixIcon: Icon(
                          FontAwesomeIcons.solidEnvelope,
                          color: Theme.of(context).accentColor,
                        ),
                        border: InputBorder.none,
                        focusedBorder: InputBorder.none,
                        enabledBorder: InputBorder.none,
                        errorBorder: InputBorder.none,
                        disabledBorder: InputBorder.none,
                        hintText: "Email-ID",
                        hintStyle: GoogleFonts.montserrat(
                          fontSize: size.height * 2 / 100,
                          fontWeight: FontWeight.w300,
                          color: Theme.of(context).primaryColor,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: size.height * 2 / 100,
                  ),
                  Container(
                    margin: EdgeInsets.only(
                      left: size.width * 8 / 100,
                      right: size.width * 8 / 100,
                    ),
                    alignment: Alignment.center,
                    padding: EdgeInsets.only(
                      left: size.width * 1 / 100,
                      right: size.width * 1 / 100,
                      bottom: size.height * 0.5 / 100,
                      top: size.height * 0.1 / 100,
                    ),
                    width: double.infinity,
                    height: size.height * 6 / 100,
                    decoration: BoxDecoration(
                      border: Border.all(color: Theme.of(context).accentColor),
                      borderRadius: BorderRadius.all(
                        Radius.circular(20),
                      ),
                    ),
                    child: TextFormField(
                      onSaved: (value) {
                        _data['password'] = value;
                      },
                      keyboardType: TextInputType.emailAddress,
                      validator: (value) {
                        if (value == '') {
                          return 'This field is empty';
                        } else {
                          return null;
                        }
                      },
                      obscureText: _isHidden,
                      cursorColor: Theme.of(context).accentColor,
                      decoration: InputDecoration(
                        prefixIcon: Icon(
                          FontAwesomeIcons.lock,
                          color: Theme.of(context).accentColor,
                        ),
                        suffixIcon: IconButton(
                          icon: Icon(
                            _isHidden
                                ? FontAwesomeIcons.eyeSlash
                                : FontAwesomeIcons.eye,
                            color: Theme.of(context).accentColor,
                          ),
                          onPressed: () {
                            setState(() {
                              _isHidden = !_isHidden;
                            });
                          },
                        ),
                        border: InputBorder.none,
                        focusedBorder: InputBorder.none,
                        enabledBorder: InputBorder.none,
                        errorBorder: InputBorder.none,
                        disabledBorder: InputBorder.none,
                        hintText: "Password",
                        hintStyle: GoogleFonts.montserrat(
                          fontSize: size.height * 2 / 100,
                          fontWeight: FontWeight.w300,
                          color: Theme.of(context).primaryColor,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: size.height * 7 / 100,
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
                        _submit();
                      },
                      splashColor: Theme.of(context).accentColor,
                      child: Center(
                        child: Text(
                          "Sign Up",
                          style: GoogleFonts.montserrat(
                            fontSize: size.height * 3 / 100,
                            fontWeight: FontWeight.w400,
                            color: Theme.of(context).backgroundColor,
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: size.height * 20 / 100,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
