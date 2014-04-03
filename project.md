# ![](i/seas.png) &nbsp; &nbsp; CS 171 - Projects

For your final assignment in this course you will work on a project. The goal of the project is to design and implement a web-based interactive visualization that allows you to answer questions you have about some topic of your own choosing. You will acquire the data, design your visualization, implement it using modern web frameworks, and evaluat the results. 

## Project Team
You will work closely with other classmates in a **2-3 person project team**. You can come up with your own teams and use Piazza to find prospective team members. If you can’t find a partner we will team you up randomly. We recognize that individual schedules, different time zones, preferences, and other constraints might limit your ability to work in a team. If this the case, ask us for permission to work alone. In general, we do not anticipate that the grades for each group member will be different. However, we reserve the right to assign different grades to each group member based on peer assessments (see below).

## Project Milestones
There are a few milestones for your final project. It is critical to note that **no extensions will be given** for any of the project due dates for any reason. Late days may not be used. Projects submitted after the final due date will not be graded. If you anticipate any issues (e.g., due to business travel) you need to send an email to the staff mailing list at least one week in advance.

* Thursday, March 13: Project proposal due (part of Homework 3)
* Tuesday, April 8th, 11:59 pm: **Announce your project repository by filling out [this form](https://docs.google.com/forms/d/1seaSw8GFe5zxN8IMB1kGUuFYQCfZ7NWxaz2NCHj-ZXo)**
* Thursday, April 10, 11:59 pm: **Functional project prototype due**
* Week of April 14: Project review with the TFs
* Thursday, May 1, 11:59pm: **Projects due  (including screencast)**
* Thursday, May 8: Best project presentations and prizes

## Proposal
You start your project by forming your groups and letting us know what topic you are interested in exploring by submitting [this project data form](https://docs.google.com/forms/d/1L7bb7R9J3yA8NSnz7tpOlOX8TFNAv9AMZCQsBQqTkMk). **Each team will only need to submit one form**. In addition to the form, you will create a proposal document, addressing the following points. Use these points as headers in your document.

* **Background and Motivation.** Discuss your motivations and reasons for choosing this project, especially any background or research interests that may have influenced your decision.
* **Project Objectives.** Provide the primary questions you are trying to answer with your visualization. What would you like to learn and accomplish? List the benefits.
* **Data.** From where and how are you collecting your data? If appropriate, provide a link to your data sources.
* **Data Processing.** Do you expect to do substantial data cleanup? What quantities do you plan to derive from your data? How will data processing be implemented?  
* **Visualization.** How will you display your data? Provide some general ideas that you have for the visualization design. Include sketches of your design.
* **Must-Have Features.** These are features without which you would consider your project to be a failure.
* **Optional Features.** Those features which you consider would be nice to have, but not critical.
* **Project Schedule.** Make sure that you plan your work so that you can avoid a big rush right before the final project deadline, and delegate different modules and responsibilities among your team members. Write this in terms of weekly deadlines.

You will submit this proposal as part of Homework 3. Based on your proposals we will assign a TF to your team who will guide you through the rest of the project. You will schedule a project review meeting with your TF during regular lecture times of the week marked in the schedule. Make sure all of your team members are present at the meeting. Online students can schedule a Skype or google hangout meeting with their TF.

## Deliverables
There are several deliverables for your project that will be graded individually to make up your final project score.

### Process Book
An important part of your project is your process book. Your process book details your steps in developing your solution, including how you collected the data, alternative designs you tried, and the insights you got. **Equally important to your final results is how you got there!** Your process book is the place you describe and document the space of possibilities you explored at each step of your project. It is not, however, a journal or lab notebook that describes every detail - you should think carefully about the important decisions you made and insights you gained and present your reasoning in a concise way.

We strongly advise you to include many figures in your process book, including photos of your sketches of potential designs, screen shots from different visualization tools you explored, inspirations of visualizations you found online, etc. Several images illustrating changes in your design or focus over time will be far more informative than text describing those changes. Instead, use text to describe the rationale behind the evolution of your project.

Your process book should include the following topics. Depending on your project type the amount of discussion you devote to each of them will vary:

* Overview and Motivation: Provide an overview of the project goals and the motivation for it. Consider that this will be read by people who did not see your project proposal.
* Related Work: Anything that inspired you, such as a paper, a web site, visualizations we discussed in class, etc.
* Questions: What questions are you trying to answer? How did these questions evolve over the course of the project? What new questions did you consider in the course of your analysis?
* Data: Source, scraping method, cleanup, etc.
* Exploratory Data Analysis: What visualizations did you use to initially look at your data? What insights did you gain? How did these insights inform your design?
* Design Evolution: What are the different visualizations you considered? Justify the design decisions you made using the perceptual and design principles you learned in the course. 
* Implementation: Describe the intent and functionality of the interactive visualizations you implemented. Provide clear and well-referenced images showing the key design and interaction elements.
* Evaluation: What did you learn about the data by using your visualizations? How did you answer your questions? How well does your visualization work, and how could you further improve it? 
 
As this will be your only chance to describe your project in detail make sure that your process book is a standalone document that fully describes your results and the final design. [Here are a few examples](https://drive.google.com/#folders/0B2Pu4bcI9HyOQWw2QnVWbU8zOVU) of process books from previous years. These are meant as inspiration and are not necessarily indicative of the format and scope of your project.

### Code
Your web-based visualization can be implemented using any API or programming language you would like as long as it runs in modern browsers, but we will only support and answer questions regarding D3 and Javascript. We expect you to write high-quality and readable code. You should strive for doing things the right way and think about aspects such as reusability, error handling, etc. [Here](http://javascript.crockford.com/code.html) are some guidelines specific to JavaScript code. We also expect you to document your code.

### Project Website
You will create a public website for your project using github pages or any other web hosting service of your choice. The web site should contain your interactive visualization, summarize the main results of the project, and tell a story. Consider your audience (the site is public) and keep the level of discussion at the appropriate level. Your process book and data should be linked to the web site as well, either using a zip file, github, bitbucket, or another code hosting site. Also embed your interactive visualization and your screencast in your website. If you are not able to publish your work (e.g., due to company confidential data) please let us know in your project proposal.

### Project Screencast
Each team will create a **two minute screencast with narration** showing a demo of your visualization and/or some slides. You can use any [screencast tool](screencast.md) of your choice. Please make sure that the sound quality of your video is good - it may be worthwhile to invest in an external USB microphone. Upload the video to an online video-platform such as YouTube or Vimeo and embed it into your project web page. We will show the best videos in class.

We will strictly enforce the two minute time limit for the video, so please make sure you are not running longer. Use principles of good storytelling and presentations to get your key points across. Focus the majority of your screencast on your main contributions rather than on technical details. What do you feel is the best part of your project? What insights did you gain? What is the single most important thing you would like your audience to take away? Make sure it is front and center rather than at the end.

### Peer Assessment
It is important to provide positive feedback to people who truly worked hard for the good of the team and to also make suggestions to those you perceived not to be working as effectively on team tasks. We ask you to provide an honest assessment of the contributions of the members of your team, including yourself. The feedback you provide should reflect your judgment of each team member’s:

* Preparation – were they prepared during team meetings?
* Contribution – did they contribute productively to the team discussion and work?
* Respect for others’ ideas – did they encourage others to contribute their ideas?
* Flexibility – were they flexible when disagreements occurred?

Your teammate’s assessment of your contributions and the accuracy of your self-assessment will be considered as part of your overall project score. 

### Submission Instructions
Submission will be handled trough github. All teams must use a single shared github repository. *If we cannot access your work because these directions are not followed correctly, we will not grade your work.* 

To submit your work **you must fill out [this form](https://docs.google.com/forms/d/1seaSw8GFe5zxN8IMB1kGUuFYQCfZ7NWxaz2NCHj-ZXo) by April 8th, 11:59 pm** where you specify your project URL. 

Store the following in your github repository:

* Code - All web site files and libraries assuming they are not too big to include
* Data - Include all the data that you used in your project. If the data is too large for github store it on a cloud storage provider, such as Dropbox or Yousendit.
* Process Book- Your Process Book in PDF format.
* README - The README file must give an overview of what you are handing in: which parts are your code, which parts are libraries, and so on. The README must contain URLs to your project websites and screencast videos. The README must also explain any non-obvious features of your interface.

### Grading Criteria
* Process Book - Are you following a design process that is well documented in your process book? 
* Solution - Is your visualization effective in answering your intended questions? 
* Implementation - What is the quality of your implementation? Is it appropriately polished, robust, and reliable?
* Presentation - Are your web site and screencast clear, engaging, and effective?
 
Your individual project score will also be influenced by your peer evaluations.

## Milestone 1 Deliverables

For your Milestone 1 we expect you to hand in your **code** and your **process book** in it's current state. You don't have to hand in a screencast and you don't have to have your website ready. 

For your Milestone you should have completed your data acquisition, or at least have a significant sample of your data. You must have your data structure ready. For example, if you plan to collect 1000 data records, but only have 200, that's fine. If you are missing one of two datasets you want to use you will loose points, since you have to have the whole structure. 

You must have a working visualization prototype. You must not have all your views up and running, and it must not be completely interactive, but the direction and the content must be clear. 

If you are uncertain about the scope, please contact your project TF.

Milestone 1 counts as 30% of your project grade.

