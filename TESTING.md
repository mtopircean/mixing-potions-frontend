|ID|Area Tested|Sub-area|User status|Description|Test Performed|Result|Mark|Re-Test|Corrective action|
|:----|:----|:----|:----|:----|:----|:----|:----|:----|:----|
|1|NavBar|NavBar|Not logged|Elements rendered as set through the code setup|Loading page|All elements load as intended|Pass|n/a|n/a|
|2|NavBar|NavBar|Logged in|Change of Login area to display user logged in options|Loading page|Area changes to display user avatar and username with dropdown options for Profile and Logout|Pass|n/a|n/a|
|3|NavBar|NavBar|Not logged|Logo display|Loading page|Logo is displayed correctly.|Pass|n/a|n/a|
|4|NavBar|NavBar|Logged in|Logo display|Loading page|Logo is displayed correctly.|Pass|n/a|n/a|
|5|NavBar|NavBar|Not logged|Navigation links display|Loading page|Navigation links are displayed correctly.|Pass|n/a|n/a|
|6|NavBar|NavBar|Logged in|Navigation links display|Loading page|Navigation links are displayed correctly.|Fail|No - Decision to document in readme in order to avoid other conflicts when fixing it. It is a small issue not affecting users experience.|Menu moves slightly up|
|7|NavBar|NavBar|Logged in|Logout action|Clicking on the logout button|Status changes to the non-logged in elements|Pass|n/a|n/a|
|8|NavBar|NavBar|n/a|Clicking on logo redirects user to homepage|Click on logo|User is taken to homepage|Pass|n/a|n/a|
|9|NavBar|NavBar|Logged in|Clicking on create post from navbar menu|Clicking the button|User is redirected to post create form|Pass|n/a|n/a|
|10|NavBar|NavBar|Not logged|Clicking on create post from navbar menu|Clicking the button|User is redirected to login screen|Pass|n/a|n/a|
|11|Footer|Footer|Not logged|Elements rendered as set through the code setup|Loading page|All elements load as intended|Pass|n/a|n/a|
|12|Footer|Footer|n/a|Clicking elements takes user to intended location|Click each element|Elements redirects to intended page/location|Pass|n/a|n/a|
|13|PostPage|PostsPage - own post|Logged in|Elements rendered as set through the code setup|Click on own post|All elements are rendered as intended including like/unlike, comment and edit/delete post|Pass|n/a|n/a|
|14|PostPage|PostsPage - own post|Not logged|Elements rendered as set through the code setup|Click on own post|All elements are rendered as intended without specific owner areas like edit/delete post, add comment, following|Pass|n/a|n/a|
|15|PostPage|Edit Post|Logged in|Clicking on Edit area of post|Click on edit section of post|User is redirected to PostEditForm|Pass|n/a|n/a|
|16|PostPage|Delete Post|Logged in|Clicking on Delete area of post|Click on delete section of post|Clicking on delete triggers confirmation alert and once confirmed deletes the comment with a toast confirmation on action performed. User is redirected to homepage.|Pass|n/a|n/a|
|17|PostPage|PostsPage - other user post|Logged in|Elements rendered as set through the code setup|Click on another users post|All elements are rendered as indented including following status and option to add a comment|Pass|n/a|n/a|
|18|PostPage|Like|Logged in|User trying to like/unlike a post|Click like button/unlike button|Like/Unlike is registered changing the like count and providing toast message on action|Pass|n/a|n/a|
|19|PostPage|Like|Not logged|User trying to like/unlike a post|Click like button(unlike not displayed)|Toast prompts user to authenticate in order to register like/unlike|Pass|n/a|n/a|
|20|PostPage|Comment section|Logged in|User trying to add a comment|Create comment and submit|User creates and submits comment, comment being displayed and toast confirmation received|Pass|n/a|n/a|
|21|PostPage|Comment section|Logged in|User trying to delete/edit a comment|Edit and delete a comment|Clicking on edit prompts user to update comment pulling initial comment data. Update then triggers the update and toast confirmation.
Clicking on delete comment triggers confirmation alert and once confirmed deletes the comment with a toast confirmation on action performed.|Pass|n/a|n/a|
|22|PostPage|Following|Logged in|Displaying and updating the status of the user|Follow/Unfollow a user|If a user is followed, Following is displayed and once clicked it is taken to the current user profile to unfollow.
If user I not followed, a Follow button is displayed which when clicked it changes the status to Following|Pass|n/a|n/a|
|23|PostCreateForm|PostCreateForm|Logged in|Elements rendered as set through the code setup|Trying to access the url:/posts/create|All elements of the create form are displayed as intended|Pass|n/a|n/a|
|24|PostCreateForm|PostCreateForm|Not logged|Elements rendered as set through the code setup|Trying to access the url:/posts/create|User is redirected to home|Pass|n/a|n/a|
|25|PostCreateForm|Form field|Logged in|Photo upload|Upload photo with correct parameters|Photo uploaded and displayed in designated area|Pass|n/a|n/a|
|26|PostCreateForm|Form field|Logged in|Photo upload|Upload photo with height over set limit|User prompted through toast on parameter breach|Pass|n/a|n/a|
|27|PostCreateForm|Form field|Logged in|Title creation|Create title within parameters|No feedback|Pass|n/a|n/a|
|28|PostCreateForm|Form field|Logged in|Title creation|Create title outside set parameters|Alert received on the form field that is outside of parameters|Pass|n/a|n/a|
|29|PostCreateForm|Form field|Logged in|Description creation(no rules applied)|Create description|No feedback|Pass|n/a|n/a|
|30|PostCreateForm|Product Panel area|Logged in|Add remove products to post/filtering|Add and remove products from a post as well as filtering products|User can filter products, add and remove them to the post as well as navigation area triggered when more then 2 products are displayed. If the same product is attempted to be added twice, toast is triggered to notify the issue.|Pass|n/a|n/a|
|31|PostEditForm|PostEditForm|Logged in|Elements rendered as set through the code setup|Trying to access the url:/edit/72|All elements of the create form are displayed as intended|Pass|n/a|n/a|
|32|PostEditForm|PostEditForm|Not logged|Elements rendered as set through the code setup|Trying to access the url:/edit/72|User is redirected to homepage|Pass|n/a|n/a|
|33|PostEditForm|PostEditForm|Logged in|Post elements are pulled in the edit form|Access edit option on an owned post|All elements of the posts are pulled in(image, used products, description).7|Pass|n/a|n/a|
|34|PostEditForm|PostEditForm|Logged in|Photo upload|Upload photo with correct parameters|Photo uploaded and displayed in designated area|Pass|n/a|n/a|
|35|PostEditForm|PostEditForm|Logged in|Photo upload|Upload photo with height over set limit|User prompted through toast on parameter breach|Pass|n/a|n/a|
|36|PostEditForm|PostEditForm|Logged in|Title creation|Create title within parameters|No feedback|Pass|n/a|n/a|
|37|PostEditForm|PostEditForm|Logged in|Title creation|Create title outside set parameters|Alert received on the form field that is outside of parameters|Pass|n/a|n/a|
|38|PostEditForm|PostEditForm|Logged in|Description creation(no rules applied)|Create description|No feedback|Pass|n/a|n/a|
|39|PostEditForm|PostEditForm|Logged in|Update post|Update elements o the post and click on Update Post|User is redirected to PostPage and change elements are displayed. User receives a toast notification that post is updated.|Pass|n/a|n/a|
|40|ProfilePage|ProfilePage - own page|Logged in|Elements rendered as set through the code setup|Trying to access the url:/profile/3|All elements of the page are displayed as intended with additional options around(Edit, ChangeUsername, ChangePassword, Followed Users area)|Pass|n/a|n/a|
|41|ProfilePage|ProfilePage - other users page|Logged in|Elements rendered as set through the code setup|Trying to access the url:/profile/23|All elements of the page are displayed as intended with additional options around(Follow/Following)|Pass|n/a|n/a|
|42|ProfilePage|ProfilePage|Not logged|Elements rendered as set through the code setup|Trying to access the url:/profile/3|All elements of the page are displayed as intended with additional options around(without specific logged in user elements as mentioned in the 2 tests above)|Pass|n/a|n/a|
|43|ProfilePage|Following|Logged in|User can follow/unfollow another users profile|Accessing profile/23 as profile/3|If user is not followed, follow option is displayed. Once clicked, status changes to following. Clicking following it takes the user to their own profile where they can remove the follow status. Returning back to the other profile, follow status is changed back to follow.|Pass|n/a|n/a|
|44|ProfilePage|Edit field|Logged in|Accessing the edit form|Click on Edit|User is redirected to ProfileEditForm|Pass|n/a|n/a|
|45|ProfilePage|Change Username field|Logged in|Accessing the change username form|Click on Change Username|User is redirected to ChangeUsername|Pass|n/a|n/a|
|46|ProfilePage|Change Password field|Logged in|Accessing the change password form|Click on Change Password|User is redirected to ProfilePasswordChange|Pass|n/a|n/a|
|47|ProfilePage|Edit field|Logged in|Accessing the edit form|Access profiles/3/edit|User is redirected to Homepage|Pass|n/a|n/a|
|48|ProfilePage|Change Username field|Logged in|Accessing the change username form|Access profiles/3/change-username|User is redirected to Homepage|Pass|n/a|n/a|
|49|ProfilePage|Change Password field|Logged in|Accessing the change password form|Access profiles/3/password-change|User is redirected to Homepage|Pass|n/a|n/a|
|50|ProfilePage|Followed users area|Logged in|Displaying list of followed users|Follow /profile/23and return to own profile page|Once followed username is present in logged in users profile page in followed area. Clicking unfollow removes it offering the owner a notification on action success. Moving back to the unfollowed users page, follow is again displayed as an option instead of following.|Pass|n/a|n/a|
|51|ProfilePage|User Posts area|Logged in|Displaying own create posts|Access /profile/3 logged in as /profile/3|Post owned by the user are displayed in the relevant area.|Pass|n/a|n/a|
|52|ProfilePage|User Posts area|Not logged|Displaying Profile Owner user posts|Access /profile/23 logged in as /profile/3|Post owned by the profile owner who's page was accessed are displayed in the relevant area.|Pass|n/a|n/a|
|53|ProfilePage|Ranking and avatar|Logged in|Displaying information on ranking and avatar based on backend data|Create new user and change the status in backend as admin|Default is triggered upon username creation. Login is as admin in backend and changing the status is updating the ranking and avatar image as per rules setup in backend.|Pass|n/a|n/a|
|54|ProfileEditForm|ProfileEditForm|Logged in|Elements rendered as set through the code setup|Trying to access the url:/profile/3/edit|All elements of the page are displayed as intended with additional options around(Follow/Following)|Pass|n/a|n/a|
|55|ProfileEditForm|ProfileEditForm|Not logged|Elements rendered as set through the code setup|Trying to access the url:/profile/3/edit|User is redirected to homepage|Pass|n/a|n/a|
|56|ProfileEditForm|Input fields|Logged in|Fields have placeholders setup with the exception of about me and Nickname. Fields are editable and have set rules and error alerts.|Input data in each fields in various formats and lengths.|If a field is not accepting a specific format user is notified. If field limits are breached user is notified with an alert(ex. Longer then accepted text). About me and Nickname have the current prepopulated data not as placeholder but as already existing text that can be edited.|Pass|n/a|n/a|
|57|ProfileEditForm|Labels|Logged in|Labels already give a preview of existing data and updated data, except about me and nickname.|Type in the fields updated data.|Labels are changing as data is being updated.|Pass|n/a|n/a|
|58|ProfileEditForm|Save|Logged in|Saving changes|Clicking the Save button|Changes are saved and user receives a toast notification that changes where made.|Pass|n/a|n/a|
|59|ProfileEditForm|Cancel|Logged in|Cancelling changes|Clicking the Cancel button|User is returned to the own profile page.|Pass|n/a|n/a|
|60|ProfilePasswordChange|ProfilePasswordChange|Logged in|Elements rendered as set through the code setup|Trying to access the url:/profile/3/password-change|All elements of the page are displayed as intended|Pass|n/a|n/a|
|61|ProfilePasswordChange|ProfilePasswordChange|Not logged|Elements rendered as set through the code setup|Trying to access the url:/profile/3/password-change|User is redirected to homepage|Pass|n/a|n/a|
|62|ProfilePasswordChange|ProfilePasswordChange|Logged in|Password not compliant|Tried to input a longer then accepted password.|Alert is received that password exceeds the acceptable length|Pass|n/a|n/a|
|63|ProfilePasswordChange|ProfilePasswordChange|Logged in|Password not compliant|Tried to input mismatching passwords|Alert is received that password is not matching|Pass|n/a|n/a|
|64|ProfilePasswordChange|Save|Logged in|Saving password change|Click on Save button|Change is saved, user notified by toast on change and redirected to profile page.|Pass|n/a|n/a|
|65|ProfilePasswordChange|Cancel|Logged in|Cancelling password change|Click on Cancel button|User is redirected to profile page.|Pass|n/a|n/a|
|66|ChangeUsername|ChangeUsername|Logged in|Elements rendered as set through the code setup|Trying to access the url:/profile/3/change-username|All elements of the page are displayed as intended|Pass|n/a|n/a|
|67|ChangeUsername|ChangeUsername|Not logged|Elements rendered as set through the code setup|Trying to access the url:/profile/3/change-username|User is redirected to homepage|Pass|n/a|n/a|
|68|ChangeUsername|ChangeUsername|Logged in|Username non compliant|Tried to input same existing username or a non accepted length|Alert is received as toast on non compliant username|Pass|n/a|n/a|
|69|ChangeUsername|Save|Logged in|Saving username change|Click on Save button|Change is saved, user notified by toast on change and redirected to profile page.|Pass|n/a|n/a|
|70|ChangeUsername|Cancel|Logged in|Cancelling username change|Click on Cancel button|User is redirected to profile page.|Pass|n/a|n/a|
|71|GDPR Page|GDPR Page|n/a|Elements rendered as set through the code setup|Trying to access the url:/gdpr page|All elements of the page are displayed as intended|Pass|n/a|n/a|
|72|Page not found|Page not found|n/a|Accessing a non existent page|Trying to access the url:/gdpr/xyz page|Page not found is returned|Pass|n/a|n/a|
|73|Console errors|All pages|n/a|Checking console errors while triggering actions|Actions taken with console log opened|The errors found are as follows:|Fail|No - Several 401 errors due to missing authentification:Failed to load resource: the server responded with a status of 401 |n/a|
