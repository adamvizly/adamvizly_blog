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
        this.echo('Hi, I am Ali Asghari, a Senior Software Engineer specializing in backend development. \n' +
                  'I am ' + age + ' years old and currently living in Iran. \n' +
                  'I enjoy board games, online video games, and spending time with my family.\n');
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
        this.echo("Resume: https://github.com/adamvizly/adamvizly.github.io/raw/master/Ali_Asghari.pdf");
    },
    experience: function(company='all') {
        switch (company.toLowerCase()) {
            case 'g2tech':
                this.echo("AI Software Engineer \nG2Tech - Nov 2024 to Present \nTabriz, Iran \n" +
                          "- Implemented transformer-based question generation model (86% relevancy).\n" +
                          "- Built real-time Q&A system handling 100+ student queries daily.\n" +
                          "- Created a custom knowledge base using pgvector and embedding models.\n" +
                          "- Designed microservices architecture ensuring 99% system availability.\n");
                break;
            case 'nobitex':
                this.echo("Senior Software Engineer \nNobitex - Apr 2021 to Aug 2023 \nRemote \n" +
                          "- Architected a financial reporting system processing 2,000+ monthly reports.\n" +
                          "- Designed and optimized RESTful APIs handling 3M+ daily requests.\n" +
                          "- Developed internal admin dashboard increasing operational efficiency by 30%.\n");
                break;
            case 'snappfood':
                this.echo("Software Engineer \nSnappfood - Oct 2019 to Feb 2021 \nTehran, Iran \n" +
                          "- Developed high-performance delivery service supporting 3,000+ daily orders.\n" +
                          "- Implemented financial transaction system managing 1,000 weekly users.\n" +
                          "- Created KPI monitoring system reducing inefficiencies by 40%.\n");
                break;
            case 'pezeshkekhoob':
                this.echo("Software Engineer Intern \nPezeshkekhoob - Jan 2019 to Sep 2019 \nTehran, Iran \n" +
                          "- Developed RESTful APIs handling 1.5M monthly requests.\n" +
                          "- Migrated PHP platform to Django, increasing availability by 10%.\n");
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
