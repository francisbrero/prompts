---
title: "Excalidraw Architecture Diagram Creator"
description: "Create Excalidraw visualizations of a project's architecture with two different levels of granularity, following C4 model conventions and industry best practices."
tags: ["productivity", "architecture", "diagram", "excalidraw", "c4"]
tool: "claude"
example_output: |
  Excalidraw visualizations of a project's architecture with two different levels of granularity...
---

# Architecture Diagram Creation Prompt

Create Excalidraw visualizations of a project's architecture with two different levels of granularity, following C4 model conventions and industry best practices.

## Requirements

### Two Diagram Types
1. **High-Level Architecture (C4 Context & Container View)**: Shows main functional blocks and how they connect - gives clear system overview
2. **Detailed Service Architecture (C4 Component View)**: Breaks down high-level blocks to show specific services, internal workings, and data flows

### C4 Model Styling Guidelines

#### Shape Coding
- **System Boundary**: Rectangle with solid line to contain all internal components
- **External System**: Rectangle with dashed line or different fill color for third-party systems
- **Functional Block/Service**: Rounded rectangle or square for major applications/microservices
- **Data Store**: Cylinder or specific icon for databases, cache, file storage
- **User/Person**: Stick figure or simple person icon for human users

#### Color Coding
- **In-Scope Systems**: Consistent color (blue/green/gray) for team-owned components
- **External Systems**: Contrasting color (gray/light blue/yellow) for external systems
- **Data Stores**: Distinct color (orange/purple) for databases and storage
- **User/Person**: Neutral color (light gray) for human actors

#### Text & Labeling Conventions
- **Labels**: Every shape has clear, concise label with name and function description
- **Relationships**: Every connecting line labeled with relationship type (e.g., "API Call (REST/HTTP)", "Reads from", "Publishes")
- **Arrows**: Show direction of data flow
- **Legend**: Comprehensive legend explaining all shapes, colors, and line styles
- **Technology Stack**: Include relevant technology names in labels

### Layout Requirements
- **No overlapping text**: Ensure all text boxes are clearly visible and readable
- **Proper spacing**: Adequate space between all elements
- **Clear separation**: Keep diagrams separate with distinct titles
- **Professional appearance**: Clean, consistent design following industry standards
- **Vertical positioning**: After drawing the first diagram, calculate its lowest point (bottom Y coordinate), add padding (minimum 100px), and position any subsequent diagrams below this point to ensure clear visual separation
- **Arrow clearance**: Maintain minimum 20px clearance between arrows and component blocks to prevent visual overlap. Arrows should never touch or appear to intersect with block boundaries
- **Text fitting**: Ensure all component boxes are large enough to contain their text labels without overflow. If text doesn't fit, either increase the box size or reduce the font size to maintain readability while keeping text fully contained within box boundaries

### Content Structure

#### High-Level Diagram Should Show:
- External users and systems
- Main system boundary
- Core applications and services
- Data stores and external integrations
- Clear relationship flows

#### Detailed Diagram Should Show:
- System boundary containing internal components
- Service layers (Frontend, API, Business Logic, etc.)
- Individual components within each layer
- External integrations and data providers
- Internal data flows and relationships

## Instructions
1. Analyze the project structure and architecture
2. Create two separate, well-spaced diagrams
3. Use consistent C4 model conventions throughout
4. Ensure all text is readable with no overlaps
5. Include comprehensive legends for both diagrams
6. Add clear titles for each diagram
7. Use appropriate colors and shapes for different element types
8. Label all relationships and data flows

Focus on simplicity, consistency, and clarity. The goal is to create diagrams that anyone familiar with standard architecture conventions can easily understand.

---