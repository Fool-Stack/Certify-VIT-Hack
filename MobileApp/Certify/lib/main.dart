import 'package:Certify/loginScreen.dart';
import 'package:Certify/providers/reg.dart';
import 'package:Certify/screens/homeScreen.dart';
import 'package:Certify/screens/loginScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    RestartWidget(
      child: MyApp(),
    ),
  );
}

class RestartWidget extends StatefulWidget {
  RestartWidget({this.child});

  final Widget child;

  static void restartApp(BuildContext context) {
    context.findAncestorStateOfType<_RestartWidgetState>().restartApp();
  }

  @override
  _RestartWidgetState createState() => _RestartWidgetState();
}

class _RestartWidgetState extends State<RestartWidget> {
  Key key = UniqueKey();

  void restartApp() {
    setState(() {
      key = UniqueKey();
    });
  }

  @override
  Widget build(BuildContext context) {
    return KeyedSubtree(
      key: key,
      child: widget.child,
    );
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
    ]);
    return MultiProvider(
      providers: [
        ChangeNotifierProvider.value(
          value: Reg(),
        ),
      ],
      child: Consumer<Reg>(
        builder: (context, reg, _) => MaterialApp(
            debugShowCheckedModeBanner: false,
            theme: ThemeData(
              highlightColor: Colors.transparent,
              splashColor: Colors.transparent,
              brightness: Brightness.dark,
              primaryColor: Color(0xffdddddd),
              accentColor: Color(0xff5757ff),
              cardColor: Color(0xff1f1f1f),
              backgroundColor: Color(0xff111111),
            ),
            home: reg.isReg
                ? HomeScreen()
                : FutureBuilder(
                    future: reg.tryAutoLogin(),
                    builder: (context, res) {
                      if (res.connectionState == ConnectionState.waiting) {
                        return LoadingScreen();
                      } else {
                        if (res.data) {
                          return HomeScreen();
                        } else {
                          return LoginScreen();
                        }
                      }
                    })),
      ),
    );
  }
}
