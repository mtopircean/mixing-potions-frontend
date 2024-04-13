# Mixing Potions

Mixing potions was born of desire to connect people with common interest around the use of alternative medicine, and more specific essential oils through a social platform that enables them to create and share their experiences using this products in a user friendly and easy to understand manner.

The project is a continuation of my Project 3 and more specific Project 4 which touched the same topic, but in a different manner.
Website will be used by my wife to follow her passion in alternative medicine and more specific, her passion for doTTera products.

Project is connected to the backend components created in the backend portion of the project found here:

[Mixing Potions Backend](https://github.com/mtopircean/mixing-potions-backend)

![Alt text](../mixing-potions-frontend/docs/testing/images/amiresponsive.png)

## Table of Contents

- [The 5 Planes strategy](#the-5-planes-strategy)
    - [The Strategy Plane](#the-strategy-plane)
        - [Planning](#planning)
        - [Kanban Board](#kanban-board)
            - [Kanban overview](#kanban-overview)
            - [Epics](#epics)
            - [Stories](#stories)
            - [Stories prioritization](#stories-prioritization)
            - [Milestones](#milestones)
            - [Sprints](#sprints)
    - [The Scope Plane](#the-scope-plane)
    - [The Structure Plane](#the-structure-plane)
        - [Features](#features)
            - [Existing Features](#existing-features)
            - [Future Features](#future-features)
    - [The Skeleton Plane](#the-strategy-plane)
        - [Wireframes](#wireframes)
        - [Databases](#databases)
        - [Security](#security)
    - [The Surface Plane](#the-surface-plane)
        - [Theme](#theme)
        - [Colour Selection](#colour-selection)
        - [Font and text style](#font-and-text-style)
        - [Imagery](#imagery)
        - [Display size optimization](#display-size-optimization)
        - [Accessibility](#accessibility)
- [Technologies Used](#technologies-used)
  - [Frameworks and Languages](#frameworks-and-languages)
  - [Additional JavaScript and React Libraries](#additional-javascript-and-react-libraries)
  - [Other Software](#other-software)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)
  - [Inspiration](#inspiration)
  - [Sources](#sources)
  - [Acknowledgements](#acknowledgements)


### Planning
Planning was done following an Agile methodology by creating 4 Sprints focused around 4 milestones. They where highly connected to each other following a natural logic in regards of timing and development steps.

Status as of 13.04.2024:

* Milestone
![Alt text](../mixing-potions-frontend/docs/planes/planning/milestones.png)

* Labels
![Alt text](../mixing-potions-frontend/docs/planes/planning/labels.png)

* Status
![Alt text](../mixing-potions-frontend/docs/planes/planning/status.png)

* Milestone by status
![Alt text](../mixing-potions-frontend/docs/planes/planning/milestones_by_status.png)

* Milestone by labels
![Alt text](../mixing-potions-frontend/docs/planes/planning/milestones_by_labels.png)



### Kanban Board
Board was designed to cover all planning aspects and offer a structured process to tackle the activities and work on my project.


#### Kanban overview
Kanban board is structured around 4 Epics connected to different functionalities, modules and stages of the project. This Epics also related to Milestones.

Status as of 13.04.2024:

![Alt text](../mixing-potions-frontend/docs/planes/planning/kanban_board.png)

#### Epics

In total we have 4 epics:
* EPIC 1: Setup and Deployment- As a developer, I can install basic dependencies, create the document hierarchy/structure and deploy the application to Heroku so that the development environment is set up, and the application is accessible online for testing and use.

* EPIC 2: Basic Social Network Features - As a developer, I can implement user authentication, profile and post creation, so that users can create basic content on the social network.

* EPIC 3: Extended Features - As a developer, I can implement following system, liking and commenting functionality, and enable sharing content on social media, so that users can engage actively with the content and other users on the social network.

* EPIC 4: Create documentation - As a developer, I can create README documentation, develop tests and document them so that I can provide suitable information related to how the website was developed and tested to outside sources.

#### Stories

You can find the story list here: [STORIES](https://github.com/mtopircean/mixing-potions-frontend/issues)

Attached to the 4 epics I`ve created approximately 11 stories structured around various prioritization methods:
* Milestones
* Sprints
* Importance priority
* Story points
* Kanban category:
    * To Do : Stories to be worked on but not allocated to a priority section
    * In Progress: Stories being worked on
    * Done: Stories completed
    * Closed: Stories with all tasks closed and closure is validated
    * Nice to do: Future developments
    * Should do: If time allowed, still to be done
* Epics:
    * Epic 1: 3 stories
    * Epic 2: 2 stories 
    * Epic 3: 3 stories
    * Epic 4: 3 stories

All user stories where completed and closed, the only ones remaining would be the stories allocated in the Nice to do.

* Nice to do:
    * User Story 3.3: Sharing Content on Social Media


Stories where then broken down into a structure that allowed for Acceptance criteria to be defined, as well as the story to be broken down in tasks in order to follow a systematic development, as well as a way to track progress.

Please find bellow an example of a story:
![Alt text](../mixing-potions-frontend/docs/planes/planning/story_example.png)

#### Stories prioritization
My goal in the development of the project was to deploy an Agile methodology, allocating importance on the strategic prioritization of user stories. This involved aligning tasks to optimize delivery, considering dependencies, user expectations, and business scope. 

There where 3 main categories of points:
* 3 points: middle complexity/middle effort, which in essence where the first effort allocated and became the control level
* 2 points: lower complexity/lower effort stories
* 5 points: higher complexity/higher effort

Ex: Based on this prioritization framework, the following sequence outlines the order in which the user stories would have been addressed:

* Install basic dependencies (2 story points)
* User Authentication and Profile Creation (5 story points)
* Testing (5 story points)
* README (5 story points)
* ... (etc. ......)

A second system of prioritization was allocating a complexity label...which connected well with the story points system.

Thirdly, milestones and sprints also played a crucial role in prioritizing my stories and keeping control on the timing of my project.

Example of label allocation:

![Alt text](../mixing-potions-frontend/docs/planes/planning/label_allocation.png)


#### Milestones
4 Milestones where created and structured around key steps in the development process, and around a well balanced timing:
![Alt text](../mixing-potions-frontend/docs/planes/planning/milestones_planning.png)

#### Sprints
4 sprints where considered, also closely connected to the milestones, having the same logic behind their setup.

## The Scope Plane
This website was created with a key element in mind, to create a platform that allows users to better understand the products, share their experiences and create connections within the community
* Share experiences in posts recommending products and how they where used
* Understand how the products can be used, what they are used for
* Seach and find solutions for their conditions

For the website owner, the key focus point is to provide value to the user through various methods:
* Clear targeted, easy to understand and access solutions to user problems
* Satisfy the community needs of the users
* Offer an easy to understand, friendly and attractive user interface

## The Structure Plane
Structure and features of the website are organized around 2 concepts, concepts set in order to provide value to both the user and owner:
* Owner friendly - Backend connected
    * Easy to manage(as automated as possible):
        - key feature being the import-export function
    * Upgradable and scalable with ease
        - the reuse of different elements within pages(navbar, filter options, like, comment, follow, product panel)
* User friendly
    * Easy to navigate 
    * Key elements always on, like footer, WhatsApp contact
    * Easy to use filter section
    * Important information present in key areas of the pages, with elements easily identifiable and visible
    * Mobile friendly: taking advantage of the power of bootstrap

### Features

#### Existing Features

- **User authentication and profiles**: User can login, access their profile, update the profile with additional details not present in the current form, but which can provide more details to the community. Profile section also offers access to various data around followed users and own posts.
- **Post creation with product integration**: Users can create posts by uploading their own picture, but within the post they can select to include products based on a filter criteria. Products information is used to define specific areas within a post by concatenating data
- **Follow**: User can follow and unfollow other users, with follow status being pulled into own profile for better management system
- **Like**: User can like or unlike posts from various areas of the website(post list and post page)
- **Comment**: Users can comment, edit or delete a comment either from the front page, from the posts area or straight into each post
- **Search section**: Users can search other posts in posts page by a multitude of criteria(condition, body system, username, description, title, etc.)
- **Most Liked Users**: Using a refresh system, user can see the most liked users
- **Posts filtering**: User can search posts by body systems in the main posts page
- **Notifications**: Implemented toasts through the various areas of the website in order to highlight to the user effect of key actions
- **Non-conforming content**: Alerts are set through specific areas of the project in order to highlight to the user where content is not conformant to the backend set conditions

#### Authentication

Registration
Logged out user:
-   can access the login area through the Navbar
-   user is redirected to the login area or registered

![Alt text](../mixing-potions-frontend/docs/features/logged_out_user.png)

Logged in user:
-   Navbar status changes for the user where they have the option to logout

![Alt text](../mixing-potions-frontend/docs/features/logged_in_user.png)

#### Profiles

User can access their profile page through the Navbar section and using the login form.
Profile allows him access to areas:
-   Personal details and data management areas
-   Followed users area
-   Own Posts area

![Alt text](../mixing-potions-frontend/docs/features/own_profile.png)

If user is not logged in, by clicking a username, the username persona details are visible but the restricted owner areas are not shown of accessible.
User can also see the owner`s profile personal posts.

![Alt text](../mixing-potions-frontend/docs/features/others_profile.png)

#### Post creation & Edit Post

Post creation and edit feature are available only when logged in.
If user is not logged in, all restricted pages will be redirected to homepage.
From this page, user can make use of the product panel feature in order to create a post.
If a user wants to edit their own post, edit area is pre-populated with existing post data.
Alerts and Toasts are set to guide user on their actions/confirm or highlight issues or success.
Post Creation is allowing a concatenating process of the Body Systems and Conditions of the products used in a post.

![Alt text](../mixing-potions-frontend/docs/features/create_post.png)

#### Follow

User can follow another user from their profile.
They can unfollow a user by either going straight in their own profile, or clicking following from the followed users profile, which will redirect them to the unfollow area

![Alt text](../mixing-potions-frontend/docs/features/own_profile.png)

#### Like

User can like a post either from the main posts page or from the individual post page.
They will unlike through the same areas.
Toasts will prompt each action.

Like general:

![Alt text](../mixing-potions-frontend/docs/features/like_general.png)

Like post page:

![Alt text](../mixing-potions-frontend/docs/features/like_post_page.png)

#### Comment

User can comment the same, from the general post page or from individual post page.
When logged out, users can only see the comment, but when logged in they can create, update, edit or delete.
Toasts will prompt the users on their actions

Comment general:

![Alt text](../mixing-potions-frontend/docs/features/comment_general.png)

Comment post page:

![Alt text](../mixing-potions-frontend/docs/features/comment_post_page.png)

#### Search

Users can use the search criteria in the main page in order to allow them to search posts by various filters like: username, products used, conditions and body systems, description and title.
The refresh is done automatically when typing in the search criteria

![Alt text](../mixing-potions-frontend/docs/features/search_liked.png)

#### Most Liked

Most Liked is currently using a manual refresh system due to it`s limitations.
It is visible top in desktop mode and bottom of page in mobile. This is done as personal choice at this stage to keep a specific flow of the page.

![Alt text](../mixing-potions-frontend/docs/features/search_liked.png)

#### Filtering

Filtering is done through the Body Systems area or by most liked users, in addition to the search bar.
Multiple selections are available only for the Body Systems.

![Alt text](../mixing-potions-frontend/docs/features/filtering.png)

#### Notification & Non-conforming content

Alerts are set for the input fields area in the various forms implemented(registration, profile editing areas, post create/edit page).
Toasts are also used to give responses to users based on their actions.
Image upload conditions where set in the front page and response to user was given through toast for this specific section

Toasts:

![Alt text](../mixing-potions-frontend/docs/features/notifications.png)


Alerts:

![Alt text](../mixing-potions-frontend/docs/features/notifications_alerts.png)

#### Products panel

A products panel was implemented to support the Post Creation action.
This pulls the existing product database and allows a filtering system based on the body systems where the product is used.

![Alt text](../mixing-potions-frontend/docs/features/products_panel.png)

#### Future Features

Future features include:

-   ability to share posts on main social media
-   ability to add and edit products from front-end
-   ability for users to create communities as we as having an integrated chat system
-   Most Liked will be able to refresh itself with each click of the Like/Unlike button
-   Automated avatar and ranking change based on set specific logic: at the moment, it is done manual by the website administrator
-   Posts maintain data when refreshed

## The Skeleton Plane
### Wireframes
To support both the functionality and the design part of the website, following wireframes where created.
Slight deviations have happened during the development process, but overall the main and maority of design direction has been kept.

* Account Page

![Alt text](../mixing-potions-frontend/docs/planes/wireframes/account_page.png)

* Create/Update Post Page

![Alt text](../mixing-potions-frontend/docs/planes/wireframes/create_update_post.png)

* Post Page

![Alt text](../mixing-potions-frontend/docs/planes/wireframes/post_page_logged_out.png)

* Main Posts Page

Logged out

![Alt text](../mixing-potions-frontend/docs/planes/wireframes/homepage_logged_out.png)

Logged in

![Alt text](../mixing-potions-frontend/docs/planes/wireframes/homepage_logged_in.png)

* Register/Login Page

![Alt text](../mixing-potions-frontend/docs/planes/wireframes//register_login_page.png)



* GDPR, Update Profile/Password/Username Page: basic simple design where wireframes where not needed as in general terms they followed the same logic as the others


### Databases

Database data is present as part of the backend readme.

[Mixing Potions Backend](https://github.com/mtopircean/mixing-potions-backend)

### Security

Various conditional render processes where implemented through the project that restrict the user in seeing and accessing various data.
For example, in the ProfilePage, access to pages that edit the profile data are not visible and can not be accessed by the users that do not own the profile:
```
  {currentUser &&
                                currentUser.username === profile.username &&
```

Similar used in PostPage:
```
<div className="arrow-button">
            {isCurrentUserOwner && (
              <Button
                onClick={handleEdit}
                className={styles["post-edit-button"]}
              >
                Edit <FontAwesomeIcon icon={faPenSquare} />
              </Button>
            )}
            {isCurrentUserOwner && (
              <Button
                onClick={confirmDelete}
                className={styles["post-delete-button"]}
              >
                Delete <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            )}
          </div>
```


Generally, the current user context was used accross the code to render or not specific content.

The useRedirect hook was used across the code to ensure users logged out where redirected from a specific page if they where not logged in. Ex in PostCreateForm:

```
function PostCreateForm() {
    useRedirect('loggedOut');
```

Non existent pages where handled through the Page Not Found route:

```
<Route render={() => <p>Page not found!</p>} />
```