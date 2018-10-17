var myApp = angular.module("myModule", []);
//var apigClient = apigClientFactory.newClient();


var myController = function($scope,$compile, $timeout) {
    $scope.messageSent = function() {
        console.log("Message Sent");
        var message = $scope.myMessage;
       
        var userhtml='<div class = "chat self"><div class = "user-photo"><img src="images/akriti.JPG"/></div><p class = "chat-message">'+ message+'</p></div>';
        el = document.getElementById('chatlogs');
       
        console.log($scope.message);

        angular.element(el).append( $compile(userhtml)($scope) )
        $scope.myMessage = "";
        $timeout(function () {
            /*if(message == "How are you") {
                var reply = "I am good";
                var bothtml='<div class = "chat friend"><div class = "user-photo"><img src="images/harshul.JPG"/></div><p class = "chat-message">'+ reply +'</p></div>';
                el = document.getElementById('chatlogs');
               
                console.log($scope.message);
        
                angular.element(el).append( $compile(bothtml)($scope) )
               
            }*/

            var apigClient = apigClientFactory.newClient({
               // accessKey: 'fgghj',
               //secretKey: 'hhhhhh',
                //sessionToken: 'lll',
                //region: 'region' // Replace with the region you deploy
            });
            
            var params = {
                //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
                param0: '',
                param1: ''
            };

            var body = {
                "messages" : 
                [{
                    "type" : "request",
                    "unstructured" : 
                    {
                        "id" : "1",
                        "text" : message,
                         "timestamp" : "10/10/2018"
                    }
        
                }]
            };

            var additionalParams = {
                //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
                headers: {
                    param0: '',
                    param1: ''
                },
                queryParams: {
                    param0: '',
                    param1: ''
                }
            };

            apigClient.chatbotPost()
            .then(function(result){
                   
                    console.log(result)
                    var botReply = result.data.messages[0].unstructured.text;
                    var bothtml='<div class = "chat friend"><div class = "user-photo"><img src="images/bot.JPG"/></div><p class = "chat-message">'+ botReply +'</p></div>';
                    el = document.getElementById('chatlogs');
                   
                    console.log($scope.message);
            
                    angular.element(el).append( $compile(bothtml)($scope) )
                   
                    //This is where you would put a success callback
            }).catch( function(result){
                    console.log(result)
                    //This is where you would put an error callback
            });

        }, 3000); 
    };
}

myApp.controller("myController", myController);