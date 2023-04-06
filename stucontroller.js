"use strict";
var app = angular.module("stuApp", ["ngRoute"]);
app.config(function ($routeProvider) {
     $routeProvider
          .when("/", {
               templateUrl: "welcome.html"
          })
          .when("/form", {
               templateUrl: 'form.html'
          })
          .when("/table", {
               templateUrl: 'table.html'
          })
          .otherwise({
               templateUrl: 'welcome.html'
          });
});
app.controller("stuCtrl", function ($scope, $http) {
     var getStuDtls = function () { //getting student details from database
          $http.post('/view').then((res) => {
               console.log(res)
               $scope.contacts = res.data;
          }).catch((err) => {
               console.log("err.......")
          })
     }
     getStuDtls();
     //when the form load initially data will bind for example
     $scope.studefaultDetails = function () {
          $scope.stuDetails = {
               fName: "EX:DAVID",
               mName: "EX:J",
               lName: "EX:MILLER",
               mailId: "abc123@gmail.com",
               num: 1234567890,
               dob: undefined,
               genderVal: undefined,
               university: undefined,
          }
     }; //server side form data passing
     var serverData = function () {
          $http.post('/stuDatabase', $scope.stuDetails).then(function (res) {
               alert("YOUR FORM WAS SUCESSFULLY SUBMITTED");
          }).catch(function (err) {
               console.log(err);
          })
     }
     var rowIndex = null;
     $scope.contacts = [];
     $scope.studefaultDetails();
     //form validation
     $scope.studformValid = function () { //dob validation
          var inputDate = $scope.stuDetails.dob;
          var stuDate = new Date(inputDate);
          var todayDate = new Date();
          var year = todayDate.getFullYear() - stuDate.getFullYear();
          var month = todayDate.getMonth() - stuDate.getMonth();
          var date = todayDate.getDate() - stuDate.getDate();
          if (inputDate == undefined) {
               $scope.errordobMsg = "*please enter your dob";
               return false;
          } else if (month < 0 || (month == 0 && date < 0)) {
               year--;
          }
          if (year < 18) {
               $scope.errordobMsg = "*student age should be above 18";
               return false;
          }
          //gender validation
          if ($scope.stuDetails.genderVal == undefined) {
               $scope.errorgenderMsg = "*please select gender";
               return false;
          }
          //university validation
          if ($scope.stuDetails.university == undefined) {
               $scope.erroruniMsg = "*please select your university";
               return false;
          } else {
               $scope.errordobMsg = "";
               $scope.errorgenderMsg = "";
               $scope.erroruniMsg = "";
               return true;
          }
     }
     //user click the submit button
     $scope.stuDatabase = function () {
          $scope.isupdateShow = false;
          if ($scope.studformValid()) {
               // update database
               if (rowIndex == null) {
                    if ($scope.contacts.length === 0) {
                         if (confirm("Are you sure to submit your information")) {
                              serverData();
                              getStuDtls();
                         }
                         $scope.studefaultDetails();
                    } //duplicate check while submitting data
                    else {
                         var isDuplicate = false;
                         for (var i = 0; i < $scope.contacts.length; i++) {
                              if ($scope.contacts[i].num === $scope.stuDetails.num) {
                                   isDuplicate = true;
                              }
                         }
                         if (!isDuplicate) {
                              $scope.contacts.push($scope.stuDetails);
                              if (confirm("Are you sure to submit your information")) {
                                   serverData();
                                   getStuDtls();
                              }
                              $scope.studefaultDetails();
                         } else {
                              alert("the register mobile number already registerd");
                         }
                    }
                    // edit data and duplicate check
               } else {
                    var isDuplicate = false;
                    for (var i = 0; i < $scope.contacts.length; i++) {
                         if (i !== rowIndex) {
                              if ($scope.contacts[i].num === $scope.stuDetails.num) {
                                   isDuplicate = true;
                              }
                         }
                    } //updata data into table
                    if (!isDuplicate) {
                         $scope.contacts[rowIndex] = angular.copy($scope.stuDetails);
                         $scope.studefaultDetails();
                         rowIndex = null;
                         if (confirm("Are you sure to update your information")) {
                              alert("YOUR FORM WAS SUCESSFULLY Updated");
                              getStuDtls();

                         }
                    } else {
                         alert("the register mobile number already registerd");
                    }
               }
          }
     } //binding the data in UI side
     $scope.stuEdit = function (index) {
          rowIndex = index;
          $scope.stuDetails = angular.copy($scope.contacts[rowIndex]);
          console.log($scope.stuDetails)
          $scope.isupdateShow = true;
     }
     //delete data
     $scope.stuDelete = function (index) {
          if (confirm(" Are you sure to delete your information")) {
               $scope.contacts.splice(index, 1);
               // $http.post('/delete', {
               //     num: $scope.contacts[index].num
               // }).then((res) => {
               //     console.log(res)
               //     getStuDtls();
               // }).catch((err) => {
               //     console.log("err..................")
               // })
          }
     }
});
