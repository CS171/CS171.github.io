---
layout: page
title: Projects
permalink: /project/
menu: Project
order: 5
---

A major part of this course is a group project, in which you will work in small teams on a web-based interactive visualization that allows you to answer questions you have about some topic of your own choosing. You will acquire the data, design your visualization, implement it using D3, and evaluate the results. 

## Project Team
You will work closely with other classmates in a **2-3 person project team**. We will form the teams in each studio group and assign students with complementary skill sets to the same team. In general, we do not anticipate that the grades for each group member will be different. However, we reserve the right to assign different grades to each group member based on peer assessments (see below).

## Project Milestones
The project consists of several milestones that need to be submitted on the specified due dates listed in the [schedule]({{ site.baseurl }}/schedule/). **No extensions will be given** for any of the project due dates for any reason. Projects submitted after the final due date will not be graded. 

The project milestones are:

* Project proposal
* Detailed project plan
* Project re-design
* Project prototypes V1 and V2
* Project review with the staff (in studio)
* Peer feedback (in studio)
* Final project submission (including screen-cast)
* Group peer evaluations
* Project demos 
* Presentation at the project showcase

## Implementation Requirements
To get a sense about the scope of your final projects, please take a look at our [gallery]({{ site.baseurl }}/fame/) of projects from previous yers.
To be more specific, your final project you have to fulfill the following requirements in regards to your visualizations and your webpage:

* Implement multiple coordinated (linked) views
* Implement at least one innovative view that is either 
	* a) an extension of an existing visualization type, or 
	* b) a novel visualization type 

There will be lectures about innovation and how to implement innovative ideas with D3 in week 11 and 12.

For grading the implementation part of the final project, we will evaluate projects by the following criteria:

* Effective visualizations
* Innovative visualizations
* Level of technical difficulty
* Clear storytelling
* Visual design (including website)
* Addresses the goals
* Sensible and effective interaction


## Project Proposal
In your project proposal you will let us know what topic you are interested in exploring, including a project title and abstract, by submitting a project proposal form. Each team will only need to submit one form.

## Project Plan
You will create a detailed project plan (during weeks 9-10), which should address the following points. For detailed submission instructions please see Canvas.

* **Basic Info.** The project title, your names, e-mail addresses, UIDs, a link to the project URL.
* **Background and Motivation.** Discuss your motivations and reasons for choosing this project, especially any background or research interests that may have influenced your decision.
* **Related Work.** Anything that inspired you, such as a paper, a web site, visualizations we discussed in class, etc.
* **Project Objectives and Goals.** Provide the primary questions you are trying to answer with your visualization. What would you like to learn and accomplish? List the benefits.
* **Tasks** Describe in detail which data manipulations (sort, filter,..) and visual manipulations (zoom, selection,…) you want to implement and how these support the goals.
* **Data.** From where and how are you collecting your data? If appropriate, provide a link to your data sources.
* **Data Processing.** Do you expect to do substantial data cleanup? What quantities do you plan to derive from your data? How will data processing be implemented?  
* **Visualization Design.** How will you display your data? Provide some general ideas that you have for the visualization design. Develop **three alternative prototype designs for your visualization**. Create **one final design that incorporates the best of your three designs**. Describe your designs and justify your choices of visual encodings. We recommend you use the [Five Design Sheet Methodology](http://fds.design/).
* **Must-Have Features.** List the features without which you would consider your project to be a failure.
* **Optional Features.** List the features which you consider to be nice to have, but not critical.
* **Project Schedule.** Make sure that you plan your work so that you can avoid a big rush right before the final project deadline, and delegate different modules and responsibilities among your team members. Write your schedule in terms of weekly deadlines.

The project plan is the first part of your process book (see Final Project Submission for details). As a ballpark number: your project plan should contain about 3-4 pages of text, plus 5-6 pages of sketches.

## Project Re-design
During studios, you will discuss and review your project plan with your TF, as well as give and receive peer feedback. These discussions will lead to a re-design of your project. The second entry in your process book should be the project re-design, including new sketches and designs based on the feedback you received.

## Project Prototypes V1 and V2
For your **prototype V1**, we expect you to hand in your code and your process book in its current state (see Final Project Submission for details). You should have completed your data acquisition, and you must have a working visualization prototype. You do not have to have all your views up and running, and it does not need to be completely interactive, but the direction and the content must be clear. 

For your **prototype V2**, we expect you to be 95% done with the implementation, and have your process book up to date. After prototype V2, you will only have one week to incorporate comments from peer feedback to produce a final interactive project website. 

## Final Project Submission
For your final project you must hand in the following items.

### Process Book
An important part of your project is your process book. Your process book details your steps in developing your solution, including the alternative designs you tried, and the insights you got. Develop your process book out of the project proposal. **Equally important to your final results is how you got there!** Your process book is the place you describe and document the space of possibilities you explored at each step of your project. It is not, however, a journal or lab notebook that describes every detail - you should think carefully about the important decisions you made and insights you gained and present your reasoning in a concise way.

We strongly advise you to include many figures in your process book, including photos of your sketches of potential designs, screen shots from different visualization tools you explored, inspirations of visualizations you found online, etc. Several images illustrating changes in your design or focus over time will be far more informative than text describing those changes. Instead, use text to describe the rationale behind the evolution of your project.

The final chapter in your process book should address the following topics. Depending on your project type the amount of discussion you devote to each of them will vary:

* Overview and Motivation: Provide an overview of the project goals and the motivation for it. Consider that this will be read by people who did not see your project proposal.
* Related Work: Anything that inspired you, such as a paper, a web site, visualizations we discussed in class, etc.
* Questions: What questions are you trying to answer? How did these questions evolve over the course of the project? What new questions did you consider in the course of your analysis?
* Data: Source, scraping method, cleanup, etc.
* Exploratory Data Analysis: What visualizations did you use to initially look at your data? What insights did you gain? How did these insights inform your design?
* Design Evolution: What are the different visualizations you considered? Justify the design decisions you made using the perceptual and design principles you learned in the course. Did you deviate from your proposal?
* Implementation: Describe the intent and functionality of the interactive visualizations you implemented. Provide clear and well-referenced images showing the key design and interaction elements.
* Evaluation: What did you learn about the data by using your visualizations? How did you answer your questions? How well does your visualization work, and how could you further improve it? 
 
As this will be your only chance to describe your project in detail make sure that your process book is a standalone document that fully describes your results and the final design. [Here]({{ site.baseurl }}/assets/process_books/bansal_cao_hou.pdf) are a [few examples]({{ site.baseurl }}/assets/process_books/walsh_trevino_bett.pdf) of process books from previous years. Note that those process books do not follow the exact structure layed out here, they are meant as inspiration and are not necessarily indicative of the format and scope of your project.

### Code
Your web-based visualization can be implemented using any API or programming language you would like as long as it runs in modern browsers, but we will only support and answer questions regarding D3 and Javascript. We expect you to write high-quality and readable code. You should strive for doing things the right way and think about aspects such as reusability, error handling, etc. [Here](http://javascript.crockford.com/code.html) are some guidelines specific to JavaScript code. We also expect you to document your code.

### Project Website
You will create a public website for your project using GitHub pages or any other web hosting service of your choice (we strongly encourage to use GitHub). The web site should contain your interactive visualization, summarize the main results of the project, and tell a story. Consider your audience (the site is public) and keep the level of discussion at the appropriate level. Your process book and data should be linked from the web site as well. Also embed your interactive visualization and your screen-cast in your website. If you are not able to publish your work (e.g., due to confidential data) please let us know in your project proposal.

### Project Screen-Cast
Each team will create a **two minute screen-cast with narration** showing a demo of your visualization and/or some slides. You can use any [screencast tool]({{ site.baseurl }}/screencast/) of your choice. Please make sure that the sound quality of your video is good - it may be worthwhile to invest in an external USB microphone. Upload the video to an online video-platform such as YouTube or Vimeo and embed it into your project web page. We will show the best videos in class.

We will strictly enforce the two minute time limit for the video, so please make sure you are not running longer. Use principles of good storytelling and presentations to get your key points across. Focus the majority of your screencast on your main contributions rather than on technical details. What do you feel is the best part of your project? What insights did you gain? What is the single most important thing you would like your audience to take away? Make sure it is front and center rather than at the end.

### Group Peer Assessment
It is important to provide positive feedback to people who truly worked hard for the good of the team and to also make suggestions to those you perceived not to be working as effectively on team tasks. We ask you to provide an honest assessment of the contributions of the members of your team, including yourself. The feedback you provide should reflect your judgment of each team member’s:

* Preparation – were they prepared during team meetings?
* Contribution – did they contribute productively to the team discussion and work?
* Respect for others’ ideas – did they encourage others to contribute their ideas?
* Flexibility – were they flexible when disagreements occurred?

Your teammate’s assessment of your contributions and the accuracy of your self-assessment will be considered as part of your overall project score. 

## Submission Instructions
Final submission will be done by creating a zip file of all your files and emailing it to your project TF. At the same time, the project website must be up and running. *If your files are to big to be emailed, please make them available to your grading TF by dropbox or google drive.* 

Store the following in your zip file:

* Code - All web site files and libraries assuming they are not too big to include
* Data - Include all the data that you used in your project. If the data is too large for emailing it, store it on a cloud storage provider, such as Dropbox or Yousendit.
* Process Book- Your Process Book in PDF format.
* README - The README file must give an overview of what you are handing in: which parts are your code, which parts are libraries, and so on. The README must contain URLs to your project websites and screencast videos. The README must also explain any non-obvious features of your interface.

## Grading Criteria
The entire project is worth 40% of the entire grade, the specific break-down of the individual project parts is shown here:

* Project Proposal: 5%
* Initial and Detailed project plan: 10%
* Process Book: 5%
* Project Video and Webpage: 5%
* Project re-design: 15%
* Prototype V1: 20%
* Prototype V2 + Final Project: 40%

For the final project submissions, please keep our main grading criteria in mind:

* Process Book - Are you following a design process that is well documented in your process book? 
* Solution - Is your visualization effective in answering your intended questions? Was it designed following visualization principles? 
* Implementation - What is the quality of your implementation? Is it appropriately polished, robust, and reliable?
* Presentation - Are your web site and screencast clear, engaging, and effective?
 
Your individual project score will also be influenced by your peer evaluations.



