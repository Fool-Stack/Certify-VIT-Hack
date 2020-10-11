import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Reg with ChangeNotifier {
  String _token;
  String _email;
  int _category;

  Map _userDetails = {};

  int get category {
    return _category;
  }

  String get token {
    return _token;
  }

  String get email {
    return _email;
  }

  Map get userDetails {
    return _userDetails;
  }

  bool get isReg {
    return token != null;
  }

  Future<void> login(Map<String, String> data) async {
    final url = 'https://certify-backend-api.herokuapp.com/user/login';
    try {
      final response = await http.post(url,
          headers: {
            'Content-Type': 'application/json',
          },
          body: json.encode(data));
      if (response.statusCode == 200) {
        final resBody = json.decode(response.body);
        print(resBody);
        _token = resBody["token"];
        final userDetails = resBody["userDetails"];
        _email = userDetails["email"];
        final prefs = await SharedPreferences.getInstance();
        final _prefsData = jsonEncode({'token': _token, 'email': _email});
        await prefs.setString('userData', _prefsData);
        notifyListeners();
      }
    } catch (error) {
      throw error;
    }
  }

  Future<void> signup(Map<String, String> data) async {
    final url = 'https://certify-backend-api.herokuapp.com/user/signup';
    try {
      final response = await http.post(url,
          headers: {
            'Content-Type': 'application/json',
          },
          body: json.encode(data));
      if (response.statusCode == 201) {
        final resBody = json.decode(response.body);
        print(resBody);
        _token = resBody["token"];
        final userDetails = resBody["userDetails"];
        _userDetails['name'] = userDetails["name"];
        _userDetails['email'] = userDetails["email"];
        print(_userDetails);
        final prefs = await SharedPreferences.getInstance();
        final _prefsData = jsonEncode({'token': _token, 'email': _email});
        await prefs.setString('userData', _prefsData);
        notifyListeners();
      } else {
        throw HttpException('Signup Failed');
      }
    } catch (error) {
      throw error;
    }
  }

  Future<void> tryAutoLogin() async {
    final prefs = await SharedPreferences.getInstance();
    if (!prefs.containsKey('userData')) {
      return false;
    }
    final extractedUserData =
        json.decode(prefs.getString('userData')) as Map<String, Object>;
    _token = extractedUserData['token'];
    _email = extractedUserData['email'];
    _category = extractedUserData['category'];
    notifyListeners();
    return true;
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    _token = null;
    _email = null;
    _category = null;
    notifyListeners();
  }
}
