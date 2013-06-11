var Mocks = (function() {
  
  return {
    model: {
      Users: [
        {
          firstName: 'Kent',
          lastName: 'Dodds',
          displayName: 'Kent Dodds',
          twitterId: 'JVIODS932KDF023',
          googleId: '3902REJF023',
          facebookId: '39R0FDJSKLG',
          email: 'kent@doddsfamily.us',
          favoriteStories: [],
          role: 'admin'
        }
      ],
      Votes: [
        {
          voteType: Boolean,
          points: Number,
          voter: Schema.Types.ObjectId
        }
      ],
      Stories: [
        {
          visibility: {
            type: String,
            enum: visibilities
          },
          views: [Schema.Types.ObjectId],
          storyLines: [Schema.Types.ObjectId],
          content: 'An Awesome Story Title',
          owners: [Schema.Types.ObjectId],
          comments: [Schema.Types.ObjectId],
          votes: [Schema.Types.ObjectId]
        }
      ],
      Comments: [
          {
          content: 'This is such a cool story!',
          owners: [Schema.Types.ObjectId],
          comments: [Schema.Types.ObjectId],
          votes: [Schema.Types.ObjectId]
        }
      ],
      StoryLines: [
          {
          content: 'This is a sweet line for a story',
          owners: [Schema.Types.ObjectId],
          comments: [Schema.Types.ObjectId],
          votes: [Schema.Types.ObjectId]
        }
      ]
    }
  };

})();

module.exports = Mocks;