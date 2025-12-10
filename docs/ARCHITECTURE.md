# System Architecture

## Overview
This document visualizes the high-level architecture, build process, and data flow of the **Ultimate Comparisons** application.

> Note: These diagrams are generated using Mermaid. GitHub natively renders these diagrams.

## System Context
The application is a client-side Angular application that runs entirely in the browser (static deployment). It consumes pre-processed data files generated during the build process.

```mermaid
graph TD
    User[End User] -->|Access via Browser| Browser[Web Browser]
    Browser -->|Loads| App[Angular Application]
    App -->|Fetches| Config[Configuration - JSON]
    App -->|Fetches| Data[Comparison Data - JSON]
    
    subgraph "Static Hosting"
        App
        Config
        Data
    end
```

## Build Process (Data Pipeline)
The project uses a Gulp-based pipeline to transform raw Markdown data into JSON consumed by the Angular application.

```mermaid
flowchart LR
    subgraph "Source Data"
        MD[Markdown Files]
        Configs[YAML/JSON Configs]
    end
    
    subgraph "Build Pipeline"
        Gulp[Gulp Tasks]
        MD2JSON[md2json CLI]
        NG[Angular CLI]
    end
    
    subgraph "Output - dist"
        AppBundle[Application Bundle]
        JSONData[Processed JSON]
    end
    
    MD --> Gulp
    Configs --> Gulp
    Gulp -->|Invokes| MD2JSON
    MD2JSON -->|Generates| JSONData
    
    Gulp -->|Triggers| NG
    NG -->|Builds| AppBundle
```

## Application Architecture
The application follows a standard Angular modular architecture with NgRx for state management.

```mermaid
classDiagram
    class AppModule {
        +bootstrap
    }
    
    class Components {
        +ComparisonComponent
        +GenericTableComponent
        +FilterComponent
    }
    
    class Services {
        +DataService
        +ConfigService
    }
    
    class NgRxStore {
        +SearchState
        +ConfigurationState
        +ComparisonState
    }
    
    AppModule --> Components
    AppModule --> Services
    Components --> NgRxStore : Dispatch Actions / Select State
    Services --> NgRxStore : Load Data
    Services --> ExternalData : HTTP Get
```

## State Management (NgRx)
State is managed using NgRx with immutable updates and memoized selectors.

```mermaid
stateDiagram-v2
    [*] --> InitialState
    
    InitialState --> Loading : Load Data Action
    Loading --> Loaded : Data Loaded Success
    Loading --> Error : Data Load Fail
    
    Loaded --> Filtered : Update Filter
    Filtered --> Filtered : Update Search
    
    Filtered --> Loaded : Clear Filters
```

## User Contribution Flows
The public application allows users to contribute by creating new entries or editing existing ones via GitHub integration.

```mermaid
graph TD
    User[End User]
    App[Public Static Site]
    GH[GitHub Repository]

    User -->|View Comparison| App
    
    subgraph "Contribution Flows"
        App -->|Click Edit| Edit[Open GitHub File]
        App -->|Click Add Entry| Add[Open Modal]
        
        Add -->|Fill Form| Form[Entry Form]
        Form -->|Submit| GHIntent[Construct GitHub URL]
        
        Edit --> GH
        GHIntent -->|Opens /new/| GH
    end
    
    GH -->|Pull Request| Maintainer[Repo Maintainer]
```

## Configuration Admin Interface
The repository includes a local-only admin interface for editing configuration files during development. This connects to a local Node.js server.

```mermaid
graph TD
    Dev[Developer] -->|Access| AdminUI[Config Admin UI]
    
    subgraph "Local Development Environment"
        AdminUI -->|HTTP /api/config| Proxy[Dev Server Proxy]
        Proxy -->|Forward| Server[Config Server - Port 3100]
        Server -->|Read/Write| FS[Local File System]
        
        FS -->|Watch| Gulp[Gulp Build]
        Gulp -->|Update| Dist[dist - Assets]
        Dist -->|Serve| Angular[Angular Dev Server]
    end
```

## Key Technologies
- **Angular 21**: Core framework
- **NgRx 20**: State management (Store, Effects)
- **TypeScript 5.9**: Language
- **Gulp 4**: Task runner for data processing
- **md2json**: Custom tool for Markdown to JSON conversion
