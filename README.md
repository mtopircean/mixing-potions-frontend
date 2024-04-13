# Mixing Potions

Mixing potions was born of desire to connect people with common interest around the use of alternative medicine, and more specific essential oils through a social platform that enables them to create and share their experiences using this products in a user friendly and easy to understand manner.

The project is a continuation of my Project 3 and more specific Project 4 which touched the same topic, but in a different manner.
Website will be used by my wife to follow her passion in alternative medicine and more specific, her passion for doTTera products.

Project is connected to the backend components created in the backend portion of the project found here:

[Mixing Potions Backend](https://github.com/mtopircean/mixing-potions-backend)

![](../mixing-potions-frontend/docs/testing/images/amiresponsive.png)

## Table of Contents

-   [Features](#features)
    -   [Existing Features](#existing-features)
    -   [Future Features](#future-features)
-   [Design Process](#design-process)
    -   [Strategy Plane](#strategy-plane)
    -   [Scope Plane](#scope-plane)
    -   [Structure Plane](#structure-plane)
    -   [Skeleton Plane](#skeleton-plane)
    -   [Surface Plane](#surface-plane)
-   [Agile Methodology](#agile-methodology)
    -   [GitHub Issues and Projects as Agile Tools](#github-issues-and-projects-as-agile-tools)
    -   [Sprint Planning](#sprint-planning)
-   [Technologies Used](#technologies-used)
    -   [Frameworks and Languages](#frameworks-and-languages)
    -   [Additional JavaScript and React Libraries](#additional-javascript-and-react-libraries)
    -   [Other Software](#other-software)
-   [Testing](#testing)
-   [Deployment](#deployment)
-   [Credits](#credits)
    -   [Inspiration](#inspiration)
    -   [Sources](#sources)
    -   [Acknowledgements](#acknowledgements)

#### Authentication

Registration
Logged out user:
-   can access the login area through the Navbar
-   user is redirected to the login area or registered

![](../mixing-potions-frontend/docs/features/logged_out_user.png)

Logged in user:
-   Navbar status changes for the user where they have the option to logout

![](../mixing-potions-frontend/docs/features/logged_in_user.png)

#### Profiles

User can access their profile page through the Navbar section and using the login form.
Profile allows him access to areas:
-   Personal details and data management areas
-   Followed users area
-   Own Posts area

![](../mixing-potions-frontend/docs/features/own_profile.png)

If user is not logged in, by clicking a username, the username persona details are visible but the restricted owner areas are not shown of accessible.
User can also see the owner`s profile personal posts.

![](../mixing-potions-frontend/docs/features/others_profile.png)

#### Post creation & Edit Post

Post creation and edit feature are available only when logged in.
If user is not logged in, all restricted pages will be redirected to homepage.
From this page, user can make use of the product panel feature in order to create a post.
If a user wants to edit their own post, edit area is pre-populated with existing post data.
Alerts and Toasts are set to guide user on their actions/confirm or highlight issues or success.
Post Creation is allowing a concatenating process of the Body Systems and Conditions of the products used in a post.

![](../mixing-potions-frontend/docs/features/create_post.png)

#### Follow

User can follow another user from their profile.
They can unfollow a user by either going straight in their own profile, or clicking following from the followed users profile, which will redirect them to the unfollow area

![](../mixing-potions-frontend/docs/features/own_profile.png)

#### Like

User can like a post either from the main posts page or from the individual post page.
They will unlike through the same areas.
Toasts will prompt each action.

Like general:

![](../mixing-potions-frontend/docs/features/like_general.png)

Like post page:

![](../mixing-potions-frontend/docs/features/like_post_page.png)

#### Comment

User can comment the same, from the general post page or from individual post page.
When logged out, users can only see the comment, but when logged in they can create, update, edit or delete.
Toasts will prompt the users on their actions

Comment general:

![](../mixing-potions-frontend/docs/features/comment_general.png)

Comment post page:

![](../mixing-potions-frontend/docs/features/comment_post_page.png)

#### Search

Users can use the search criteria in the main page in order to allow them to search posts by various filters like: username, products used, conditions and body systems, description and title.
The refresh is done automatically when typing in the search criteria

![](../mixing-potions-frontend/docs/features/search_liked.png)

#### Most Liked

Most Liked is currently using a manual refresh system due to it`s limitations.
It is visible top in desktop mode and bottom of page in mobile. This is done as personal choice at this stage to keep a specific flow of the page.

![](../mixing-potions-frontend/docs/features/search_liked.png)

#### Filtering

Filtering is done through the Body Systems area or by most liked users, in addition to the search bar.
Multiple selections are available only for the Body Systems.

![](../mixing-potions-frontend/docs/features/filtering.png)

#### Notification & Non-conforming content

Alerts are set for the input fields area in the various forms implemented(registration, profile editing areas, post create/edit page).
Toasts are also used to give responses to users based on their actions.
Image upload conditions where set in the front page and response to user was given through toast for this specific section

Toasts:

![](../mixing-potions-frontend/docs/features/notifications.png)


Alerts:

![](../mixing-potions-frontend/docs/features/notifications_alerts.png)

#### Products panel

A products panel was implemented to support the Post Creation action.
This pulls the existing product database and allows a filtering system based on the body systems where the product is used.

![](../mixing-potions-frontend/docs/features/products_panel.png)

### Future Features

Future features include:

-   ability to share posts on main social media
-   ability to add and edit products from front-end
-   ability for users to create communities as we as having an integrated chat system
-   Most Liked will be able to refresh itself with each click of the Like/Unlike button
-   Automated avatar and ranking change based on set specific logic: at the moment, it is done manual by the website administrator
-   Posts maintain data when refreshed
