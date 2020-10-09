import 'package:flutter/material.dart';

class BounceOut extends PageRouteBuilder {
  final Widget widget;
  BounceOut({this.widget})
      : super(
            transitionDuration: Duration(milliseconds: 300),
            transitionsBuilder: (BuildContext context,
                Animation<double> animation,
                Animation<double> secanimation,
                Widget child) {
              animation =
                  CurvedAnimation(parent: animation, curve: Curves.elasticOut);

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
