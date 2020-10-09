import 'package:Certify/screens/loginScreen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Color(0xffdddddd),
        accentColor: Color(0xff5757ff),
        backgroundColor: Color(0xff111111),
      ),
      home: LoginScreen(),
    );
  }
}
