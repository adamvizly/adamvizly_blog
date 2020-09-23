$('body').terminal({
    ls: function() {
        this.echo('about -> about me! \n' +
                  'skill -> my skills \n' +
                  'education -> my educations \n' +
                  'experience company_name -> my expperiences company name is optional \n' +
                  'contact -> ways of contacting me \n' +
                  'resume -> download pdf version of resume \n');
    },
    about: function() {
        this.echo('Experienced Python Developer with a demonstrated history of working in web development. \n' +
                  'Skilled in Python, Django, Flask, PostgreSQL and MySQL. Strong algorithms understanding and experience in full software development cycle.\n');
    },
    skill: function() {
        this.echo('Python  4.5/5 \n' +
                  'Django  4/5 \n' + 
                  'Flask  4.5/5 \n' +
                  'Git  4.5/5 \n' +
                  'PostgreSQL  4/5 \n' + 
                  'MySQL  4/5 \n' + 
                  'PHP  2/5 \n' +
                  'Angular  1/5 \n');
    },
    education: function() {
        this.echo("Sharif University of Technology  Master's degree in Computer Science (Drop out) \n" +
                  "University of Tabriz  Bachelor's degree in Computer Science\n");
    },
    contact: function() {
        const linkedin = $("<a target='_blank' href='https://www.linkedin.com/in/ali-asghari/'> LinkedIn </a>");
        const github = $("<a target='_blank' href='https://github.com/adamvizly'> Github </a>");
        const email = $("<a target='_blank' href='mailto:asghari.ali10@gmail.com'> Email </a>");
        this.echo(linkedin);
        this.echo(github);
        this.echo(email);
    },
    resume: function() {
        const resume = $("<a href='https://github.com/adamvizly/adamvizly.github.io/raw/master/Resume.pdf'>Resume</a>");
        this.echo(resume);
    },
    experience: function(company='all') {
        switch (company) {
            case 'snappfood':
                this.echo("Back End Developer \nSnappfood Full-time \nOct 2019 – Present \nTehran, Iran \n" +
                          "Snappfood is the leading online food delivery company in Iran.\n" + 
                          "Customers can find menus, order food and get delivered from more than 13,500 restaurants all over Iran through the Snappfood website and mobile application. \n" +
                          "Since its creation in 2009, Snappfood has continuously transformed the way people order food.\n" +
                          "My Responsibilities: \n" +
                          "-Developing and maintaining Snappfood Express application, responsible for handling delivery of ordered food \n" +
                          "-Developing and maintaining a service to handle financial transactions of bikers \n" +
                          "-Developing and maintaining a service to monitor KPIs-Defining and implementing CI/CD procedures \n" +
                          "-Implementing and maintaining a Docker Swarm orchestration platform to deploy services\n");
                break;
            case 'pezeshkekhoob':
                this.echo("Back End Developer \nPezeshkekhoob Full-time \nJan 2019 – Sep 2019 \nTehran, Iran \n" +
                          "Pezeshkekhoob is a Platform to book a doctor's appointment with over 32000 doctors and over 1.5 million views per month.\n" + 
                          "My Responsibilities: \n" +
                          "-Created RESTful APIs for increased scalability of the application \n" +
                          "-Renovate old PHP website with new Django powered one \n" +
                          "-Created monitoring system for BI purposes from scratch with Python and Angular\n");
                break;
            case 'zhool':
                this.echo("Back End Developer \nZhool Part-time \nJul 2018 – Jun 2019 \nTabriz, Iran \n" +
                          "I was CTO of ZHOOL a startup in art industry that unfortunately failed.\n");
                break;
            case 'arasnama':
                this.echo("Back End Developer \nArasnama Part-time \nJul 2017 – Aug 2018 \nTabriz, Iran \n" +
                          "Arasnama was a advertising platform for local and small businesses through Telegram.\n" + 
                          "I was tech guy at Arasnama and responsible for creating RESTful APIs for increased scalability of the application and integrated with TelegramAPI.\n" +
                          "we reached 1000 users in less than a week.\n");
                break;
            default:
                this.echo("snappfood \n" +
                          "pezeshkekhoob \n" + 
                          "zhool \n" +
                          "arasnama \n");
        }
    }
}, {
    checkArity: false,
    completion: true,
    greetings: '[[;rgba(255,0,255,0.99);]Welcome, I am Ali Asghari] \nUse ls to see list of commands'
});
