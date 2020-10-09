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
        primaryColor: Color(0xff1f1f1f),
        accentColor: Color(0xff5757ff),
      ),
      home: LoginScreen(),
    );
  }
}
