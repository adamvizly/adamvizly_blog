$('body').terminal({
    ls: function() {
        this.echo('about -> about me! \n' +
                  'skill -> my skills \n' +
                  'education -> my education \n' +
                  'experience company_name -> my experiences (company_name is optional) \n' +
                  'contact -> ways of contacting me \n' +
                  'resume -> download pdf version of resume \n');
    },
    about: function() {
        let date = new Date();
        let age = date.getFullYear() - 1996;
        this.echo("Hey there, My name is Ali and I'm a developer.\n" + 
                  "l've been working with Python for the last 6 years, most of the time working as a backend developer with Django but I also have some experience with FastAPI and Flask.\n" + 
                  "I have some experience with Linux, Docker, Redis, RabbitMQ and Celery.\n" +
                  "Besides computers, I like good music, books and building useful products.\n" +
                  "I have a Master's degree in Computer Science.");
    },
    skill: function() {
        this.echo('Python  5/5 \n' +
                  'Django  4.5/5 \n' + 
                  'FastAPI  4.5/5 \n' +
                  'Flask  4/5 \n' +
                  'Git  4.5/5 \n' +
                  'PostgreSQL  4/5 \n' + 
                  'MySQL  4/5 \n' + 
                  'MongoDB  4/5 \n' +
                  'Redis  4/5 \n' +
                  'Docker  4/5 \n' +
                  'CI/CD  4/5 \n' +
                  'Prometheus/Grafana  3.5/5 \n' +
                  'AI/ML (Transformers, RAG)  3.5/5 \n');
    },
    education: function() {
        this.echo("Tarbiat Modares University - Master's in Computer Science (2020 - 2022) \n" +
                  "University of Tabriz - Bachelor's in Computer Science (2014 - 2018) \n");
    },
    contact: function() {
        this.echo("LinkedIn: https://www.linkedin.com/in/ali-asghari/ \n" +
                  "GitHub: https://github.com/adamvizly \n" +
                  "Email: asghari.ali10@gmail.com \n");
    },
    resume: function() {
        this.echo("Resume: https://github.com/adamvizly/adamvizly.github.io/raw/master/ali_asghari_software_engineer.pdf");
    },
    experience: function(company='all') {
        switch (company.toLowerCase()) {
            case 'g2tech':
                this.echo("AI Software Engineer \nG2Tech - Nov 2024 to Present \nTabriz, Iran \n" +
                          "Edthech startup where I was in charge of adding AI into existing software. worked on RAG and knowledge bases.\n");
                break;
            case 'nobitex':
                this.echo("Senior Software Engineer \nNobitex - Apr 2021 to Aug 2023 \nRemote \n" +
                          "Largest crypto currency exchange in the country.\n" +
                          "worked on reporting system and internal tools.\n");
                break;
            case 'snappfood':
                this.echo("Software Engineer \nSnappfood - Oct 2019 to Feb 2021 \nTehran, Iran \n" +
                          "Largest food delivery service in the country.\n" +
                          "worked on refactoring matching service and monitoring and internal tools.\n");
                break;
            case 'pezeshkekhoob':
                this.echo("Software Engineer Intern \nPezeshkekhoob - Jan 2019 to Sep 2019 \nTehran, Iran \n" +
                          "Health tech startup.\n" +
                          "joined as an intern and worked on converting backend from php to django.\n");
                break;
            default:
                this.echo("Available experiences: g2tech, nobitex, snappfood, pezeshkekhoob");
        }
    }
}, {
    checkArity: false,
    completion: true,
    greetings: '[[;rgba(247,198,20,0.99);]Welcome to my interactive resume! I am Ali Asghari] \nUse ls to see available commands.'
});
