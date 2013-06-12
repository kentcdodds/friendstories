var Mocks = (function() {
  var db = require('../../controllers/db');
  var _ = require('underscore');
  db.setupResources();
  
  var UserResource = require('../../models/User');
  var StoryResource = require('../../models/Story');
  var StoryLineResource = require('../../models/StoryLine');
  var VoteResource = require('../../models/Vote');
  var CommentResource = require('../../models/Comment');
  var FlagReportResource = require('../../models/FlagReport');
  
  var User = UserResource.model;
  var Story = StoryResource.model;
  var StoryLine = StoryLineResource.model;
  var Vote = VoteResource.model;
  var Comment = CommentResource.model;
  var FlagReport = FlagReportResource.model;
  
  var i = 0;
  var j = 0;

  var randomString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate urna eget cursus volutpat. Maecenas egestas purus sed arcu venenatis pretium. Ut rhoncus nulla vitae felis pellentesque ornare. Donec vel diam nisi. Cras eu enim leo. Etiam et enim lorem. Fusce rhoncus neque arcu, non euismod neque lobortis eget. Praesent placerat mi nec vulputate adipiscing. Nulla facilisi. Mauris dignissim fringilla ligula eget rutrum. Suspendisse ac tortor eu enim euismod auctor. Morbi pretium erat est, vel ornare massa eleifend sed. Curabitur eu dignissim orci, in posuere sapien. Donec ligula risus, tempus in sem ut, porta faucibus massa. "
  randomString += randomString + randomString + randomString;
  var getRandomString = function(length) {
    var start = _.random(0, randomString.length - length);
    var shortRandomString = randomString.substring(start, start + length);
    return shortRandomString;
  };
  
  var cloneArray = function(original, copy) {
    for (var pos = 0; pos < original.length; pos++) {
      copy.push(original[pos]);
    }
  }
  
  var getRandomItem = function(arry, exclusions) {
    exclusions = exclusions || [];
    if (!_.isArray(exclusions)) {
      exclusions = [exclusions];
    }
    var item = arry[_.random(arry.length - 1)];
    if (_.indexOf(exclusions, item) === -1) {
      return item;
    } else if (arry.length > exclusions.length) {
      return getRandomItem(arry, exclusions);
    }
  };
  
  var getVotes = function(options) {
    options = options || {};
    var votes = [];
    var max = options.max || 4;
    var min = options.min || 0;
    for (var voteI = 0; voteI < _.random(min, max) && availableObjects.Votes.length > 0; voteI++) {
      var vote = availableObjects.Votes.pop();
      vote.setPointsFor(options.type);
      votes.push(vote._id);
    }
    return votes;
  };
  
  var modelMocks = {};
  var availableObjects = {};

  // --------------------- Setup Users ------------------------- //
  var user0 = new User({
    firstName: 'Remone',
    lastName: 'Olivinas',
    displayName: 'RomOne',
    twitterId: 'F0235TGJD02',
    googleId: 'T9203864TRRELJR',
    facebookId: 'T20JDGLKSA',
    email: 'oneRem@example.com',
    favoriteStories: [],
    role: 'user'
  });

  var user1 = new User({
    firstName: 'Kent',
    lastName: 'Dodds',
    displayName: 'Kent Dodds',
    twitterId: 'JVIODS932KDF023',
    googleId: '3902REJF023',
    facebookId: '39R0FDJSKLG',
    email: 'kent@doddsfamily.us',
    favoriteStories: [],
    role: 'admin'
  });

  var user2 = new User({
    firstName: 'Jeff',
    lastName: 'Frontam',
    displayName: 'FrontaMan',
    twitterId: '32JDA230RFDJSA',
    googleId: 'FJD023GJDSAL',
    facebookId: 'F230TJEK035723',
    email: 'frontaman@example.com',
    favoriteStories: [],
    role: 'user'
  });

  var user3 = new User({
    firstName: 'Jessica',
    lastName: 'Simpson',
    displayName: 'Jessie Grl',
    twitterId: 'F2FJ2003G',
    googleId: '9R20FJDSKAL325',
    facebookId: 'UT2903FAS',
    email: 'jessiegrl23@example.com',
    favoriteStories: [],
    role: 'moderator'
  });

  modelMocks.Users = [user0, user1, user2, user3];
  availableObjects.Users = [];
  cloneArray(modelMocks.Users, availableObjects.Users);

  // --------------------- Setup Votes ------------------------- //
  modelMocks.Votes = [];
  for (i = 0; i < 700; i++) {
    modelMocks.Votes.push(new Vote({
      voteType: (Math.random() > 0.5)
    }));
  }
  
  availableObjects.Votes = [];
  cloneArray(modelMocks.Votes, availableObjects.Votes);
  
  // --------------------- Setup Stories ------------------------- //
  modelMocks.Stories = [];
  
  for (i = 0; i < 10; i++) {
    var visibility = getRandomItem(StoryResource.visibilities);
    var owner0 = getRandomItem(modelMocks.Users);
    var owner1 = getRandomItem(modelMocks.Users, [owner0]);
    if (owner0 === owner1) {
      throw new Error("This shouldn't happen!");
    }
    var owners = [owner0._id, owner1._id];
    var viewers = [owner0._id, owner1._id];
    for (j =  0; j < modelMocks.Users.length * .75; j++) {
      viewers.push(getRandomItem(modelMocks.Users)._id);
    }
    viewers = _.uniq(viewers);
    modelMocks.Stories.push(new Story({
      visibility: visibility,
      owners: owners,
      viewers: viewers,
      storyLines: [],
      content: getRandomString(_.random(7, 15)),
      votes: getVotes({type: 'Story'}),
      comments: [],
      annonymousViewCount: _.random(500)
    }));
  }

  availableObjects.Stories = [];
  cloneArray(modelMocks.Stories, availableObjects.Stories);

  // --------------------- Setup Comments ------------------------- //
  modelMocks.Comments = [];
  for (i = 0; i < 225; i++) {
    modelMocks.Comments.push(new Comment({
      content: getRandomString(_.random(5, 30)),
      owners: [getRandomItem(modelMocks.Users)._id],
      votes: getVotes({type: 'Comment'})
    }));
  }
  
  availableObjects.Comments = [];
  cloneArray(modelMocks.Comments, availableObjects.Comments);

    // --------------------- Setup StoryLines ------------------------- //
  modelMocks.StoryLines = [];
  for(i = 0; i < modelMocks.Stories.length; i++) {
    var story = modelMocks.Stories[i];
    for (j = 0; j < _.random(10, 25); j++) {
      var storyLine = new StoryLine({
        content: getRandomString(_.random(40, 80)),
        owners: [story.owners[j % 2]],
        votes: getVotes({type: 'StoryLine'}),
      });
      story.storyLines.push(storyLine);
      modelMocks.StoryLines.push(storyLine);
    }
  }
  
  // --------------------- Relate objects ------------------------- //
  //Flag random UserContents
  modelMocks.FlagReports = [];
  var flagRandomUserContents = function(arry) {
    for (i = 0; i < arry.length; i++) {
      if (Math.random() < .15) {
        var item = arry[i];
        var flagReport = new FlagReport({
          flagType: getRandomItem(FlagReportResource.flagTypes),
          content: getRandomString(_.random(15, 25)),
          owners: getRandomItem(_.difference(modelMocks.Users, item.owners)),
          votes: getVotes({type: 'FlagReports'})
        });
        modelMocks.FlagReports.push(flagReport);
        item.flagReports = item.flagReports || [];
        item.flagReports.push(flagReport);
      }
    }
  };

  flagRandomUserContents(modelMocks.Comments);
  flagRandomUserContents(modelMocks.Stories);
  flagRandomUserContents(modelMocks.StoryLines);

  var relateObjects = function(arry, min, max, itemArry, propertyName) {
    for (i = 0; i < arry.length; i++) {
      var items = [];
      for (j = 0; j < _.random(min, max); j++) {
        items.push(getRandomItem(itemArry)._id);
      }
      arry[i][propertyName] = _.uniq(items);
    } 
  };
  
  relateObjects(modelMocks.Users, 5, 20, modelMocks.Stories, 'favoriteStories');
  relateObjects(modelMocks.Comments, -3, 5, modelMocks.Comments, 'comments');
  relateObjects(modelMocks.Stories,4 , 7, modelMocks.Comments, 'comments');
  relateObjects(modelMocks.StoryLines, -2, 3, modelMocks.Comments, 'comments');
  relateObjects(modelMocks.FlagReports, -2, 3, modelMocks.Comments, 'comments');
  
  
//  console.log(JSON.stringify(modelMocks, null, 2));
//  console.log(JSON.stringify(modelMocks.Comment, null, 2));
//  console.log(JSON.stringify(modelMocks.Stories, null, 2));
//  console.log(JSON.stringify(modelMocks.StoryLines, null, 2));
//  console.log(JSON.stringify(modelMocks.Users, null, 2));
//  console.log(JSON.stringify(modelMocks.Votes, null, 2));
//  console.log(JSON.stringify(modelMocks.FlagReports, null, 2));

  return {
    models: modelMocks
  };
})();

module.exports = Mocks;