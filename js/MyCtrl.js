uno.controller('CustomCtrl', function($location, $timeout, $scope, $http, _uno, $rootScope){

    $scope.getChildLength = function(id, db){
        //console.log($scope.$parent[db].filter(function(value){ return (value.parent_id == id)}).length);
        return $scope.$parent[db].filter(function(value){ return (value.parent_id == id)});
    };

    $scope.getObject = function(db, col, val){
        return $scope[db].filter(function(value){ return (value[col] == val)})[0];
    };

    $scope.send_mail = function(email){
        $http.post('php/mail.php', {'email': email.email, 'subject': email.subject, 'message': email.message}).success(function(data){
            $scope.mail_sent = true;
            console.log(data);
        });

        $timeout(function(){
            $scope.mail_sent = false;
        }, 500);
    };

    $scope.loginCallback = function(){
        console.log('YOU JUST LOGGD IN BOI!!!');
    };

    $scope.hasProfile = function(userId){
        var bool = false;
        if($scope.$parent.profiles.filter(function(value){ return (value.user_id == userId); })[0] !== undefined)
            bool = true;
        else
            bool = false;

        return bool;
    };

    $scope.boardUpdated = function(params){
        $scope.board_updated = true;
        $timeout(function(){
            $location.path('/board/'+params.obj.id);
        }, 50);
    };

    $scope.pUpdated = function(params){
        $scope.profile_updated = true;
        $timeout(function(){
            $location.path('/user/'+params.obj.user_id);
        }, 50);
    };

    $scope.uUpdated = function(params){
        console.log(params);
        $scope.user_updated = true;
        _uno.reset_user(params.obj);
        $timeout(function(){
            $location.path('/user/'+params.obj.id);
        }, 50);
    };

    $scope.createBoardCallback = function(params){
        $scope.board_added = false;
        console.log($scope.isAdmin);
        if(!$scope.isAdmin){
            $location.path('/forums');
        }
    };

    $scope.boardCreated = function(params){
        console.log('Yepperszz!');
        $scope.board_added = true;
        $timeout(function(){
            $location.path('/forums');
        }, 100);
    };

    $scope.manageAccountCallback = function(params){
        if(params.obj.id == $scope.currentUser.id){
            $scope.user_updated = false;
        }else{
            if($scope.currentUser)
                $location.path('/user/'+$scope.currentUser.id);
            else
                $location.path('/news');
        }
        console.log(params.obj);
    };

    $scope.createProfileCallback = function(params){
        $scope.profile_created = false;
        var profile = $scope.profiles.filter(function(value){ return (value.user_id == params.parent_obj.id); })[0];
        console.log(profile);
        if(profile === undefined){
            if(params.parent_obj.id != $scope.currentUser.id){
                $location.path('/user/'+$scope.currentUser.id);
            }else{
                console.log('This is yours bruh!');
            }
        }else{
            $location.path('/manage_profile/'+$scope.currentUser.id);
        }
    };

    $scope.profileCreated = function(params){
        $scope.profile_created = true;
        $timeout(function(){
           $location.path('/user/'+$scope.currentUser.id);
        }, 100);
    };

    $scope.likePost = function(id){
        _uno.get('get post_likes user_id '+$scope.currentUser.id+' spec', true).success(function(data){

            if(data.length){
                var likedPost = data.filter(function(value){ return (value.post_id == id && value.db == 'blog_posts'); })[0];
                if(likedPost){
                    console.log('Already Liked');
                }else{
                     _uno.get_spec('blog_posts', 'id', id, false).success(function(data){
                        var newLikes = parseInt(data.likes) + 1;
                        console.log(newLikes);
                        _uno.post('UPDATE `blog_posts` SET `likes`='+newLikes+' WHERE id='+id).success(function(data){
                            console.log('Post Liked At ['+id+']');
                            console.log(typeof(data.likes));
                            _uno.post('INSERT INTO `post_likes` (user_id, post_id, db) VALUES ('+$scope.currentUser.id+', '+id+', "blog_posts");').success(function(data){
                                console.log('Like Added!');
                            });
                        });
                    });
                }

            }else{
                _uno.get_spec('blog_posts', 'id', id, false).success(function(data){
                    var newLikes = parseInt(data.likes) + 1;

                    _uno.post('UPDATE `blog_posts` SET `likes`='+newLikes+' WHERE id='+id).success(function(data){
                        console.log('Post Liked At ['+id+']');
                        console.log(typeof(data.likes));
                        _uno.post('INSERT INTO `post_likes` (user_id, post_id, db) VALUES ('+$scope.currentUser.id+', '+id+', "blog_posts");').success(function(data){
                            console.log('Like Added!');
                        });
                    });
                });
            }
        });
    };

    $scope.manageProfileCallback = function(params){
        if(params.obj.user_id == $scope.currentUser.id){
            $scope.profile_updated = false;
        }else{
            if($scope.currentUser)
                $location.path('/user/'+$scope.currentUser.id);
            else
                $location.path('/news');
        }

    };

    $scope.forumBoardCallback = function(params){
        $scope.board_updated = false;
        $scope.board_created = false;
    };

    $scope.postCallback = function(scope){
        $scope.post_deleted = false;
    };

    $scope.postUpdated = function(params){
        $scope.post_updated = true;
        if($scope.post_updated){
            $location.path('/news/'+params.obj.id);
        }
    };

    $scope.commentAdded = function(params){
        console.log('Comment Addded');
        console.log(params);
    };

    $scope.postAdded = function(params){
        $scope.post_added = true;
        $timeout(function(){
            $location.path('/news');
        }, 50);
    };

    $scope.editTopicCallback = function(scope){
        console.log(scope.obj.user_id);
        $scope.topic_added = false;
        $scope.topic_edited = false;
        if(scope.obj.user_id != scope.$parent.$parent.currentUser.id){
            console.log('YOU DIDNT MAKE THIS TOPIC BRUH!');
            $location.path('/home');
        }else{
            console.log('You made this bruhh...');
        }
    };

    $scope.createTopicCallback = function(scope){
        $scope.topic_edited = false;
        $scope.topic_added = false;
    };

    $scope.topicUpdated = function(params){
        $scope.topic_edited = true;
        //console.log(params);
        $timeout(function(){
            $location.path('/topic/'+params.obj.id+'');
        }, 50);
    };

    $scope.topicAdded = function(params){
        $scope.topic_added = true;
        console.log(params.scope.parent_obj.id);
        $timeout(function(){
            $location.path('/board/'+params.scope.parent_obj.id+'');
        }, 50);
    };

    $scope.deletedPost = function(params){
        $scope.post_deleted = true;
        console.log(params);
        $timeout(function(){
            $location.path('/news');
        }, 50);
    };

   $scope.deletedTopic = function(params){
        $scope.post_deleted = true;
        console.log(params);
        $timeout(function(){
            $location.path('/board/'+params.obj.parent_id);
        }, 50);
    };

    $scope.alreadyLikedPost = function(id){
        _uno.get('get post_likes user_id '+$scope.currentUser.id+' spec', true).success(function(data){
            angular.forEach(data, function(likedPost){
                if(likedPost.id == id){
                    return true;
                }else{
                    return false;
                }
            });
        });
    };

    $scope.likeCallback = function(params){
        console.log($scope.$parent);
        var post = $scope.$parent.blog_posts.filter(function(value){ return (value.id == params['id']); })[0];

        var newLikes = parseInt(post.likes) - 1;
        var update_query = 'UPDATE `blog_posts` SET `likes`='+newLikes+' WHERE id='+params['id'];

        if($scope.currentUser){
            _uno.get('get post_likes user_id '+params['user_id']+' spec', true).success(function(data){
                if(data.length){
                    var likedPost = data.filter(function(value){ return (value.post_id == post.id)})[0];

                    if(likedPost !== undefined){
                        console.log('ALREADY LIKED!');
                        _uno.post(update_query).success(function(d){
                           console.log(d);
                        });
                    }else{
                        var query = 'INSERT INTO `post_likes` (user_id, post_id, db) VALUES('+$scope.currentUser.id+', '+params['id']+', "'+params['db']+'");';
                        _uno.post(query).success(function(data){
                            console.log('Like Added! :)');
                        });
                    }

                }else{
                    var query = 'INSERT INTO `post_likes` (user_id, post_id, db) VALUES('+$scope.currentUser.id+', '+params['id']+', "'+params['db']+'");';
                    _uno.post(query).success(function(data){
                        console.log('Like Added! :)');
                    });
                }
            });
        }else{
            _uno.post(update_query).success(function(d){
               console.log(d);
            });
        }
    };
});