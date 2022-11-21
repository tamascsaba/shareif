# 🤠 Shareif

Secure data share app, guarded by Chuck Norris.

Demo: https://shareif.surge.sh/

## :books: Architecture

```plain
------------------------------------------- Source Code ----------------------------------

              ┌─────────┐
              │  Source │
              └────┬────┘
                   │
                   ▼         
              ┌─────────┐ 
              │  Surge  │ 
              └────┬────┘
                   │                
-------------------│---------------------- Cloud (google and surge) -----------------------
                   ▼ 
              ┌───────────┐            ┌───────────┐ 
              │    CDN    │            │ Firestore │
              └───────────┘            └───────────┘  
-------------------│---------------------│-----▲---- Browser ------------------------------
                   │                     │     │ 
                   ▼                     ▼     │                         
              ┌───────────┐         ┌────────────────┐ 
              │    UI     ├──Data──►│ Encryt/Decrypt │
              └───────────┘         └────────────────┘                          

------
```


### :green_book: Dream Architecture

```plain
------------------------------------------- Pipeline ---------------------------------------

          ┌   ┌─────────┐
          │   │ Source  │
          │   └────┬────┘
          │        ▼  
          │   ┌─────────┐
 Github   │   │  Tests  │
 Action   │   └────┬────┘
          │        ▼         
          │   ┌─────────┐ 
          │   │ Release │ 
          └   └────┬────┘
                   ▼
              ┌──────────┐
              │ Test env │
              └────┬─────┘               
-------------------│----------------------- Cloud -----------------------------------------
          ┌        ▼                                                         ┌ 
          │  ┌───────────┐          ┌───────────┐     ┌────────────┐         │  ┌───────────┐
 Google   │  │    CDN    │          │ Functions ├────►│  Firestore │  Senty  │  │  Sentry   │
 Cloud    │  └───────────┘          └───────────┘     └────────────┘  Cloud  │  └───────────┘
          └        │                   ▲     │                               └       ▲
-------------------│-------------------│-----│-- Browser ----------------------------│-----
                   │                   │     │                                       │
                   ▼                   │     ▼                                       │
              ┌───────────┐       ┌────────────────┐                                 │
              │    UI     ├─Data─►│ Encryt/Decrypt │                                 │
              └───────────┘       └────────────────┘                                 │
                   │                                                                 │
                   └──────────────────────── Log and errors──────────────────────────┘

-------------------------------------------------------------------------------------------
```

## :floppy_disk: Install
Run `npm i` or `yarn`

## :movie_camera: Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## :newspaper: Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## :package: Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## :chart: Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## :bar_chart: Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
