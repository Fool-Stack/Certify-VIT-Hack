import 'package:flutter/material.dart';

class BounceIn extends PageRouteBuilder {
  final Widget widget;
  BounceIn({this.widget})
      : super(
            transitionDuration: Duration(milliseconds: 400),
            transitionsBuilder: (BuildContext context,
                Animation<double> animation,
                Animation<double> secanimation,
                Widget child) {
              animation = CurvedAnimation(
                  parent: animation, curve: Curves.elasticInOut);

              return ScaleTransition(
                alignment: Alignment.center,
                scale: animation,
                child: child,
              );
            },
            pageBuilder: (BuildContext context, Animation<double> animation,
                Animation<double> secanimation) {
              return widget;
            });
}
