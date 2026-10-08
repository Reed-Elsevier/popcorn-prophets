# Entity-Relationship Diagrams

## Full ecosystem

```mermaid
erDiagram
    SITES ||--o{ DIVISIONS : "center_site_id"
    DIVISIONS ||--o{ DEPARTMENTS : "division_id"
    SITES ||--o{ DEPARTMENTS : "primary_site_id"
    DEPARTMENTS ||--o{ ROLES : "department_id"
    SITES ||--o{ EMPLOYEES : "site_id"
    DIVISIONS ||--o{ EMPLOYEES : "division_id"
    DEPARTMENTS ||--o{ EMPLOYEES : "department_id"
    TEAMS ||--o{ EMPLOYEES : "team_id"
    ROLES ||--o{ EMPLOYEES : "role_id"
    EMPLOYEES ||--o{ EMPLOYEES : "manager_id"
    DEPARTMENTS ||--o{ TEAMS : "department_id"
    DIVISIONS ||--o{ TEAMS : "division_id"
    SITES ||--o{ TEAMS : "site_id"
    EMPLOYEES ||--o{ TEAMS : "team_lead_employee_id"
    SKILL_TAXONOMY ||--o{ SKILL_TAXONOMY : "parent_taxonomy_id"
    SKILL_TAXONOMY ||--o{ SKILLS : "cluster_id"
    SKILL_TAXONOMY ||--o{ SKILLS : "domain_id"
    EMPLOYEES ||--o{ EMPLOYEE_SKILLS : "employee_id"
    SKILLS ||--o{ EMPLOYEE_SKILLS : "skill_id"
    SKILLS ||--o{ LEARNING_CONTENT : "skill_id"
    DEPARTMENTS ||--o{ LEARNING_PATHS : "owner_department_id"
    LEARNING_PATHS ||--o{ LEARNING_PATH_ITEMS : "path_id"
    LEARNING_CONTENT ||--o{ LEARNING_PATH_ITEMS : "content_id"
    EMPLOYEES ||--o{ LEARNING_RECORDS : "employee_id"
    LEARNING_CONTENT ||--o{ LEARNING_RECORDS : "content_id"
    LEARNING_PATHS ||--o{ LEARNING_RECORDS : "path_id"
    EMPLOYEES ||--o{ AI_CAPABILITY_LEVELS : "employee_id"
    LEARNING_PATHS ||--o{ AI_CAPABILITY_LEVELS : "recommended_path_id"
    ROLES ||--o{ CAREER_PATHS : "from_role_id"
    ROLES ||--o{ CAREER_PATHS : "to_role_id"
    EMPLOYEES ||--o{ INTERNAL_MOBILITY : "employee_id"
    ROLES ||--o{ INTERNAL_MOBILITY : "from_role_id"
    ROLES ||--o{ INTERNAL_MOBILITY : "to_role_id"
    TEAMS ||--o{ INTERNAL_MOBILITY : "from_team_id"
    TEAMS ||--o{ INTERNAL_MOBILITY : "to_team_id"
    ROLES ||--o{ JOB_REQUISITIONS : "role_id"
    DEPARTMENTS ||--o{ JOB_REQUISITIONS : "department_id"
    TEAMS ||--o{ JOB_REQUISITIONS : "team_id"
    SITES ||--o{ JOB_REQUISITIONS : "site_id"
    EMPLOYEES ||--o{ JOB_REQUISITIONS : "hiring_manager_id"
    JOB_REQUISITIONS ||--o{ REQUISITION_SKILLS : "requisition_id"
    SKILLS ||--o{ REQUISITION_SKILLS : "skill_id"
    DIVISIONS ||--o{ PROCESS_DEFINITIONS : "division_id"
    DEPARTMENTS ||--o{ PROCESS_DEFINITIONS : "owner_department_id"
    PROCESS_DEFINITIONS ||--o{ PROCESS_ACTIVITIES : "process_id"
    DIVISIONS ||--o{ APPLICATIONS : "division_id"
    TEAMS ||--o{ APPLICATIONS : "owner_team_id"
    TEAMS ||--o{ AI_MODELS : "owner_team_id"
    AI_MODELS ||--o{ MODEL_VERSIONS : "model_id"
    DIVISIONS ||--o{ AI_USE_CASES : "division_id"
    PROCESS_DEFINITIONS ||--o{ AI_USE_CASES : "process_id"
    TEAMS ||--o{ AI_USE_CASES : "owner_team_id"
    EMPLOYEES ||--o{ AI_USE_CASES : "sponsor_employee_id"
    EMPLOYEES ||--o{ AI_USE_CASES : "product_owner_employee_id"
    AI_MODELS ||--o{ AI_USE_CASES : "model_id"
    AI_USE_CASES ||--o{ AI_USE_CASE_KPIS : "use_case_id"
    AI_USE_CASES ||--o{ AI_GOVERNANCE_REVIEWS : "use_case_id"
    EMPLOYEES ||--o{ AI_GOVERNANCE_REVIEWS : "reviewer_employee_id"
    AI_USE_CASES ||--o{ PROJECTS : "use_case_id"
    TEAMS ||--o{ PROJECTS : "owner_team_id"
    DIVISIONS ||--o{ PROJECTS : "division_id"
    EMPLOYEES ||--o{ PROJECTS : "pm_employee_id"
    PROJECTS ||--o{ PROJECT_MEMBERS : "project_id"
    EMPLOYEES ||--o{ PROJECT_MEMBERS : "employee_id"
    PROJECTS ||--o{ PROJECT_TASKS : "project_id"
    EMPLOYEES ||--o{ PROJECT_TASKS : "assignee_employee_id"
    PROJECTS ||--o{ MILESTONES : "project_id"
    PROJECTS ||--o{ PROJECT_RISKS : "project_id"
    EMPLOYEES ||--o{ PROJECT_RISKS : "owner_employee_id"
    EMPLOYEES ||--o{ INNOVATION_IDEAS : "submitted_by_employee_id"
    TEAMS ||--o{ INNOVATION_IDEAS : "team_id"
    AI_USE_CASES ||--o{ INNOVATION_IDEAS : "linked_use_case_id"
    INSTITUTIONS ||--o{ AUTHORS : "primary_institution_id"
    AUTHORS ||--o{ AUTHOR_AFFILIATIONS : "author_id"
    INSTITUTIONS ||--o{ AUTHOR_AFFILIATIONS : "institution_id"
    TEAMS ||--o{ JOURNALS : "managing_team_id"
    AUTHORS ||--o{ JOURNALS : "editor_in_chief_author_id"
    JOURNALS ||--o{ MANUSCRIPTS : "journal_id"
    AUTHORS ||--o{ MANUSCRIPTS : "corresponding_author_id"
    AUTHORS ||--o{ MANUSCRIPTS : "handling_editor_author_id"
    EMPLOYEES ||--o{ MANUSCRIPTS : "ops_coordinator_employee_id"
    MANUSCRIPTS ||--o{ PEER_REVIEW_ASSIGNMENTS : "manuscript_id"
    AUTHORS ||--o{ PEER_REVIEW_ASSIGNMENTS : "reviewer_author_id"
    MANUSCRIPTS ||--o{ RESEARCH_PAPERS_PUBLISHED : "manuscript_id"
    JOURNALS ||--o{ RESEARCH_PAPERS_PUBLISHED : "journal_id"
    INSTITUTIONS ||--o{ RESEARCH_PAPERS_PUBLISHED : "institution_id"
    RESEARCH_PAPERS_PUBLISHED ||--o{ PAPER_AUTHORS : "paper_id"
    AUTHORS ||--o{ PAPER_AUTHORS : "author_id"
    INSTITUTIONS ||--o{ PAPER_AUTHORS : "affiliation_institution_id"
    RESEARCH_PAPERS_PUBLISHED ||--o{ CITATIONS : "citing_paper_id"
    RESEARCH_PAPERS_PUBLISHED ||--o{ CITATIONS : "cited_paper_id"
    RESEARCH_PAPERS_PUBLISHED ||--o{ CONTENT_PRODUCTION_JOBS : "paper_id"
    TEAMS ||--o{ CONTENT_PRODUCTION_JOBS : "team_id"
    EMPLOYEES ||--o{ CONTENT_PRODUCTION_JOBS : "assignee_employee_id"
    CONTENT_PRODUCTION_JOBS ||--o{ XML_CONVERSION_DEFECTS : "job_id"
    RESEARCH_PAPERS_PUBLISHED ||--o{ XML_CONVERSION_DEFECTS : "paper_id"
    RESEARCH_PAPERS_PUBLISHED ||--o{ RESEARCH_INTEGRITY_FLAGS : "paper_id"
    MANUSCRIPTS ||--o{ RESEARCH_INTEGRITY_FLAGS : "manuscript_id"
    EMPLOYEES ||--o{ RESEARCH_INTEGRITY_FLAGS : "assigned_employee_id"
    JURISDICTIONS ||--o{ COURTS : "jurisdiction_id"
    JURISDICTIONS ||--o{ LEGAL_DOCUMENTS : "jurisdiction_id"
    COURTS ||--o{ LEGAL_DOCUMENTS : "court_id"
    PRACTICE_AREAS ||--o{ LEGAL_DOCUMENTS : "practice_area_id"
    LEGAL_DOCUMENTS ||--o{ LEGAL_CITATIONS : "citing_doc_id"
    LEGAL_DOCUMENTS ||--o{ LEGAL_CITATIONS : "cited_doc_id"
    LEGAL_DOCUMENTS ||--o{ EDITORIAL_TASKS : "doc_id"
    TEAMS ||--o{ EDITORIAL_TASKS : "team_id"
    EMPLOYEES ||--o{ EDITORIAL_TASKS : "editor_employee_id"
    AI_MODELS ||--o{ EDITORIAL_TASKS : "model_id"
    JURISDICTIONS ||--o{ REGULATORY_UPDATES : "jurisdiction_id"
    PRACTICE_AREAS ||--o{ REGULATORY_UPDATES : "practice_area_id"
    REGULATORY_UPDATES ||--o{ REGULATORY_UPDATE_IMPACTS : "update_id"
    LEGAL_DOCUMENTS ||--o{ REGULATORY_UPDATE_IMPACTS : "doc_id"
    EMPLOYEES ||--o{ REGULATORY_UPDATE_IMPACTS : "editor_employee_id"
    BUSINESS_ENTITIES ||--o{ OWNERSHIP_LINKS : "parent_entity_id"
    BUSINESS_ENTITIES ||--o{ OWNERSHIP_LINKS : "child_entity_id"
    DIVISIONS ||--o{ PRODUCTS : "division_id"
    INDIVIDUALS ||--o{ ADDRESSES : "individual_id"
    INDIVIDUALS ||--o{ IDENTITY_ATTRIBUTES : "individual_id"
    INDIVIDUALS ||--o{ DEVICES : "individual_id"
    INDIVIDUALS ||--o{ ACCOUNTS : "individual_id"
    BUSINESS_ENTITIES ||--o{ ACCOUNTS : "entity_id"
    CUSTOMERS ||--o{ ACCOUNTS : "client_customer_id"
    ACCOUNTS ||--o{ TRANSACTIONS : "account_id"
    ACCOUNTS ||--o{ TRANSACTIONS : "counterparty_account_id"
    DEVICES ||--o{ TRANSACTIONS : "device_id"
    INDIVIDUALS ||--o{ WATCHLISTS : "individual_id"
    BUSINESS_ENTITIES ||--o{ WATCHLISTS : "entity_id"
    AI_MODELS ||--o{ ALERT_RULES : "model_id"
    TEAMS ||--o{ ALERT_RULES : "owner_team_id"
    ALERT_RULES ||--o{ RISK_ALERTS : "rule_id"
    TRANSACTIONS ||--o{ RISK_ALERTS : "txn_id"
    ACCOUNTS ||--o{ RISK_ALERTS : "account_id"
    EMPLOYEES ||--o{ RISK_ALERTS : "analyst_employee_id"
    CUSTOMERS ||--o{ KYC_CASES : "client_customer_id"
    INDIVIDUALS ||--o{ KYC_CASES : "subject_individual_id"
    BUSINESS_ENTITIES ||--o{ KYC_CASES : "subject_entity_id"
    EMPLOYEES ||--o{ KYC_CASES : "analyst_employee_id"
    RISK_ALERTS ||--o{ INVESTIGATIONS : "alert_id"
    KYC_CASES ||--o{ INVESTIGATIONS : "kyc_case_id"
    EMPLOYEES ||--o{ INVESTIGATIONS : "lead_analyst_employee_id"
    INVESTIGATIONS ||--o{ ANALYST_ACTIONS : "investigation_id"
    EMPLOYEES ||--o{ ANALYST_ACTIONS : "analyst_employee_id"
    DIVISIONS ||--o{ KNOWLEDGE_ARTICLES : "division_id"
    PRODUCTS ||--o{ KNOWLEDGE_ARTICLES : "product_id"
    APPLICATIONS ||--o{ KNOWLEDGE_ARTICLES : "app_id"
    TEAMS ||--o{ KNOWLEDGE_ARTICLES : "owner_team_id"
    EMPLOYEES ||--o{ KNOWLEDGE_ARTICLES : "author_employee_id"
    KNOWLEDGE_ARTICLES ||--o{ KNOWLEDGE_ARTICLE_VERSIONS : "article_id"
    EMPLOYEES ||--o{ KNOWLEDGE_ARTICLE_VERSIONS : "edited_by_employee_id"
    KNOWLEDGE_ARTICLES ||--o{ SOPS : "article_id"
    PROCESS_DEFINITIONS ||--o{ SOPS : "process_id"
    EMPLOYEES ||--o{ SOPS : "owner_employee_id"
    CUSTOMERS ||--o{ SUBSCRIPTIONS : "customer_id"
    PRODUCTS ||--o{ SUBSCRIPTIONS : "product_id"
    INSTITUTIONS ||--o{ CUSTOMERS : "institution_id"
    BUSINESS_ENTITIES ||--o{ CUSTOMERS : "entity_id"
    DIVISIONS ||--o{ CUSTOMERS : "primary_division_id"
    EMPLOYEES ||--o{ CUSTOMERS : "account_owner_employee_id"
    CUSTOMERS ||--o{ CHURN_EVENTS : "customer_id"
    SUBSCRIPTIONS ||--o{ CHURN_EVENTS : "primary_subscription_id"
    SUBSCRIPTIONS ||--o{ PRODUCT_USAGE_MONTHLY : "subscription_id"
    CUSTOMERS ||--o{ PRODUCT_USAGE_MONTHLY : "customer_id"
    PRODUCTS ||--o{ PRODUCT_USAGE_MONTHLY : "product_id"
    CUSTOMERS ||--o{ SUPPORT_CASES : "customer_id"
    PRODUCTS ||--o{ SUPPORT_CASES : "product_id"
    DIVISIONS ||--o{ SUPPORT_CASES : "division_id"
    TEAMS ||--o{ SUPPORT_CASES : "team_id"
    EMPLOYEES ||--o{ SUPPORT_CASES : "agent_employee_id"
    KNOWLEDGE_ARTICLES ||--o{ SUPPORT_CASES : "kb_article_id"
    SUPPORT_CASES ||--o{ CASE_INTERACTIONS : "case_id"
    EMPLOYEES ||--o{ CASE_INTERACTIONS : "employee_id"
    CUSTOMERS ||--o{ FEATURE_REQUESTS : "customer_id"
    PRODUCTS ||--o{ FEATURE_REQUESTS : "product_id"
    SUPPORT_CASES ||--o{ FEATURE_REQUESTS : "case_id"
    PROJECTS ||--o{ FEATURE_REQUESTS : "linked_project_id"
    SUBSCRIPTIONS ||--o{ RENEWAL_OPPORTUNITIES : "subscription_id"
    CUSTOMERS ||--o{ RENEWAL_OPPORTUNITIES : "customer_id"
    EMPLOYEES ||--o{ RENEWAL_OPPORTUNITIES : "owner_employee_id"
    TEAMS ||--o{ EVENTS : "organizer_team_id"
    EVENTS ||--o{ EVENT_SESSIONS : "event_id"
    EVENTS ||--o{ EXHIBITORS : "event_id"
    BUSINESS_ENTITIES ||--o{ EXHIBITORS : "entity_id"
    EMPLOYEES ||--o{ EXHIBITORS : "account_manager_employee_id"
    BUSINESS_ENTITIES ||--o{ VISITORS : "company_entity_id"
    VISITORS ||--o{ REGISTRATIONS : "visitor_id"
    EVENTS ||--o{ REGISTRATIONS : "event_id"
    REGISTRATIONS ||--o{ BADGE_SCANS : "registration_id"
    EXHIBITORS ||--o{ BADGE_SCANS : "exhibitor_id"
    EXHIBITORS ||--o{ LEADS : "exhibitor_id"
    VISITORS ||--o{ LEADS : "visitor_id"
    EVENTS ||--o{ LEADS : "event_id"
    BADGE_SCANS ||--o{ LEADS : "scan_id"
    CUSTOMERS ||--o{ LEADS : "converted_customer_id"
    REGISTRATIONS ||--o{ SESSION_ATTENDANCE : "registration_id"
    EVENT_SESSIONS ||--o{ SESSION_ATTENDANCE : "session_id"
    REGISTRATIONS ||--o{ EVENT_FEEDBACK : "registration_id"
    EVENTS ||--o{ EVENT_FEEDBACK : "event_id"
    DEPARTMENTS ||--o{ COST_CENTERS : "department_id"
    DIVISIONS ||--o{ COST_CENTERS : "division_id"
    SITES ||--o{ COST_CENTERS : "site_id"
    BUSINESS_ENTITIES ||--o{ SUPPLIERS : "entity_id"
    SUPPLIERS ||--o{ SUPPLIER_ENROLLMENT_REQUESTS : "supplier_id"
    EMPLOYEES ||--o{ SUPPLIER_ENROLLMENT_REQUESTS : "requested_by_employee_id"
    SUPPLIERS ||--o{ PURCHASE_ORDERS : "supplier_id"
    COST_CENTERS ||--o{ PURCHASE_ORDERS : "cost_center_id"
    EMPLOYEES ||--o{ PURCHASE_ORDERS : "requester_employee_id"
    EMPLOYEES ||--o{ PURCHASE_ORDERS : "approver_employee_id"
    SUPPLIERS ||--o{ INVOICES : "supplier_id"
    PURCHASE_ORDERS ||--o{ INVOICES : "po_id"
    EMPLOYEES ||--o{ INVOICES : "processor_employee_id"
    INVOICES ||--o{ INVOICE_LINES : "invoice_id"
    COST_CENTERS ||--o{ INVOICE_LINES : "cost_center_id"
    INVOICES ||--o{ INVOICE_EXCEPTIONS : "invoice_id"
    EMPLOYEES ||--o{ INVOICE_EXCEPTIONS : "resolver_employee_id"
    INVOICES ||--o{ PAYMENTS : "invoice_id"
    COST_CENTERS ||--o{ OPEX_BUDGET_VS_ACTUAL : "cost_center_id"
    DIVISIONS ||--o{ OPEX_BUDGET_VS_ACTUAL : "division_id"
    APPLICATIONS ||--o{ CHANGES : "app_id"
    EMPLOYEES ||--o{ CHANGES : "requested_by_employee_id"
    APPLICATIONS ||--o{ PROBLEMS : "app_id"
    APPLICATIONS ||--o{ IT_TICKETS : "app_id"
    EMPLOYEES ||--o{ IT_TICKETS : "requester_employee_id"
    TEAMS ||--o{ IT_TICKETS : "assignment_group_team_id"
    EMPLOYEES ||--o{ IT_TICKETS : "assignee_employee_id"
    KNOWLEDGE_ARTICLES ||--o{ IT_TICKETS : "kb_article_id"
    IT_TICKETS ||--o{ INCIDENTS : "ticket_id"
    APPLICATIONS ||--o{ INCIDENTS : "app_id"
    CHANGES ||--o{ INCIDENTS : "caused_by_change_id"
    PROBLEMS ||--o{ INCIDENTS : "problem_id"
    EMPLOYEES ||--o{ ACCESS_REQUESTS : "requester_employee_id"
    APPLICATIONS ||--o{ ACCESS_REQUESTS : "app_id"
    ACCESS_REQUESTS ||--o{ ACCESS_REQUEST_APPROVALS : "access_request_id"
    EMPLOYEES ||--o{ ACCESS_REQUEST_APPROVALS : "approver_employee_id"
    APPLICATIONS ||--o{ SYSTEM_EVENTS : "app_id"
    EMPLOYEES ||--o{ SYSTEM_EVENTS : "user_employee_id"
    PROCESS_DEFINITIONS ||--o{ PROCESS_EVENT_LOG : "process_id"
    PROCESS_ACTIVITIES ||--o{ PROCESS_EVENT_LOG : "activity_id"
    EMPLOYEES ||--o{ PROCESS_EVENT_LOG : "resource_employee_id"
    APPLICATIONS ||--o{ PROCESS_EVENT_LOG : "system_app_id"
    PROCESS_DEFINITIONS ||--o{ AUTOMATION_CANDIDATES : "process_id"
    PROCESS_ACTIVITIES ||--o{ AUTOMATION_CANDIDATES : "activity_id"
    EMPLOYEES ||--o{ AI_USAGE_EVENTS : "employee_id"
    AI_USE_CASES ||--o{ AI_USAGE_EVENTS : "use_case_id"
    AI_MODELS ||--o{ AI_USAGE_EVENTS : "model_id"
    EMPLOYEES ||--o{ PROMPTS_LIBRARY : "author_employee_id"
    AI_USE_CASES ||--o{ PROMPTS_LIBRARY : "use_case_id"
    AI_USAGE_EVENTS ||--o{ AI_FEEDBACK : "usage_event_id"
    EMPLOYEES ||--o{ AI_FEEDBACK : "employee_id"
    PROJECTS ||--o{ DOCUMENTS : "project_id"
    EMPLOYEES ||--o{ DOCUMENTS : "author_employee_id"
    PROJECTS ||--o{ MEETINGS : "project_id"
    TEAMS ||--o{ MEETINGS : "team_id"
    EMPLOYEES ||--o{ MEETINGS : "organizer_employee_id"
    MEETINGS ||--o{ ACTION_ITEMS : "meeting_id"
    EMPLOYEES ||--o{ ACTION_ITEMS : "owner_employee_id"
    TEAMS ||--o{ CHAT_CHANNELS : "team_id"
    PROJECTS ||--o{ CHAT_CHANNELS : "project_id"
    CHAT_CHANNELS ||--o{ CHAT_MESSAGES : "channel_id"
    EMPLOYEES ||--o{ CHAT_MESSAGES : "sender_employee_id"
    CHAT_MESSAGES ||--o{ CHAT_MESSAGES : "reply_to_message_id"
    EMPLOYEES ||--o{ EMAILS : "sender_employee_id"
    EMPLOYEES ||--o{ EMAILS : "recipient_employee_id"
    SUPPORT_CASES ||--o{ EMAILS : "related_case_id"
    EMPLOYEES ||--o{ SEARCH_LOGS : "employee_id"
    KNOWLEDGE_ARTICLES ||--o{ SEARCH_LOGS : "clicked_article_id"
    TEAMS ||--o{ PERFORMANCE_METRICS_AGGREGATE : "team_id"
```

## A. Organization & Workforce

```mermaid
erDiagram
    SITES {
        string site_id PK
        string site_name
        string city
        string region
        int floors
        int seat_capacity
        date opened_date
        string timezone
    }
    DIVISIONS {
        string division_id PK
        string division_name
        string short_code
        string global_hq_city
        string primary_client_region
        string center_site_id FK
    }
    SITES ||--o{ DIVISIONS : "center_site_id"
    DEPARTMENTS {
        string department_id PK
        string division_id FK
        string department_name
        string job_family
        string primary_site_id FK
    }
    DIVISIONS ||--o{ DEPARTMENTS : "division_id"
    SITES ||--o{ DEPARTMENTS : "primary_site_id"
    ROLES {
        string role_id PK
        string role_title
        string department_id FK
        string job_family
        string job_level
        float min_salary_php
        float max_salary_php
        bool is_ai_data_role
    }
    DEPARTMENTS ||--o{ ROLES : "department_id"
    EMPLOYEES {
        string employee_id PK
        string first_name
        string last_name
        string full_name
        string email
        string site_id FK
        string division_id FK
        string department_id FK
    }
    SITES ||--o{ EMPLOYEES : "site_id"
    DIVISIONS ||--o{ EMPLOYEES : "division_id"
    DEPARTMENTS ||--o{ EMPLOYEES : "department_id"
    TEAMS ||--o{ EMPLOYEES : "team_id"
    ROLES ||--o{ EMPLOYEES : "role_id"
    EMPLOYEES ||--o{ EMPLOYEES : "manager_id"
    TEAMS {
        string team_id PK
        string department_id FK
        string division_id FK
        string site_id FK
        string shift
        string client_region
        string team_name
        datetime formed_date
    }
    DEPARTMENTS ||--o{ TEAMS : "department_id"
    DIVISIONS ||--o{ TEAMS : "division_id"
    SITES ||--o{ TEAMS : "site_id"
    EMPLOYEES ||--o{ TEAMS : "team_lead_employee_id"
    SKILL_TAXONOMY {
        string taxonomy_id PK
        string node_level
        string node_name
        string parent_taxonomy_id FK
    }
    SKILL_TAXONOMY ||--o{ SKILL_TAXONOMY : "parent_taxonomy_id"
    SKILLS {
        string skill_id PK
        string skill_name
        string cluster_id FK
        string domain_id FK
        bool is_emerging
        string market_demand_trend
    }
    SKILL_TAXONOMY ||--o{ SKILLS : "cluster_id"
    SKILL_TAXONOMY ||--o{ SKILLS : "domain_id"
    EMPLOYEE_SKILLS {
        string employee_skill_id PK
        string employee_id FK
        string skill_id FK
        int proficiency
        date last_assessed_date
        string source
    }
    EMPLOYEES ||--o{ EMPLOYEE_SKILLS : "employee_id"
    SKILLS ||--o{ EMPLOYEE_SKILLS : "skill_id"
    LEARNING_CONTENT {
        string content_id PK
        string skill_id FK
        string format
        string title
        string provider
        string difficulty
        int duration_minutes
        string language
    }
    SKILLS ||--o{ LEARNING_CONTENT : "skill_id"
    LEARNING_PATHS {
        string path_id PK
        string skill_domain
        string target_level
        string path_name
        string owner_department_id FK
        int estimated_hours
    }
    DEPARTMENTS ||--o{ LEARNING_PATHS : "owner_department_id"
    LEARNING_PATH_ITEMS {
        string path_item_id PK
        string path_id FK
        string content_id FK
        int sequence_no
    }
    LEARNING_PATHS ||--o{ LEARNING_PATH_ITEMS : "path_id"
    LEARNING_CONTENT ||--o{ LEARNING_PATH_ITEMS : "content_id"
    LEARNING_RECORDS {
        string learning_record_id PK
        string employee_id FK
        string content_id FK
        string path_id FK
        datetime enrolled_at
        datetime completed_at
        string status
        float score
    }
    EMPLOYEES ||--o{ LEARNING_RECORDS : "employee_id"
    LEARNING_CONTENT ||--o{ LEARNING_RECORDS : "content_id"
    LEARNING_PATHS ||--o{ LEARNING_RECORDS : "path_id"
    AI_CAPABILITY_LEVELS {
        string assessment_id PK
        string employee_id FK
        date assessment_date
        float prompting_score
        float data_literacy_score
        float automation_score
        float ai_governance_score
        float overall_score
    }
    EMPLOYEES ||--o{ AI_CAPABILITY_LEVELS : "employee_id"
    LEARNING_PATHS ||--o{ AI_CAPABILITY_LEVELS : "recommended_path_id"
    CAREER_PATHS {
        string career_path_id PK
        string from_role_id FK
        string to_role_id FK
        string path_type
        int typical_months
        int observed_moves
    }
    ROLES ||--o{ CAREER_PATHS : "from_role_id"
    ROLES ||--o{ CAREER_PATHS : "to_role_id"
    INTERNAL_MOBILITY {
        string move_id PK
        string employee_id FK
        string from_role_id FK
        string to_role_id FK
        string from_team_id FK
        string to_team_id FK
        date effective_date
        string move_type
    }
    EMPLOYEES ||--o{ INTERNAL_MOBILITY : "employee_id"
    ROLES ||--o{ INTERNAL_MOBILITY : "from_role_id"
    ROLES ||--o{ INTERNAL_MOBILITY : "to_role_id"
    TEAMS ||--o{ INTERNAL_MOBILITY : "from_team_id"
    TEAMS ||--o{ INTERNAL_MOBILITY : "to_team_id"
    JOB_REQUISITIONS {
        string requisition_id PK
        string role_id FK
        string department_id FK
        string team_id FK
        string site_id FK
        string hiring_manager_id FK
        date opened_date
        date filled_date
    }
    ROLES ||--o{ JOB_REQUISITIONS : "role_id"
    DEPARTMENTS ||--o{ JOB_REQUISITIONS : "department_id"
    TEAMS ||--o{ JOB_REQUISITIONS : "team_id"
    SITES ||--o{ JOB_REQUISITIONS : "site_id"
    EMPLOYEES ||--o{ JOB_REQUISITIONS : "hiring_manager_id"
    REQUISITION_SKILLS {
        string requisition_skill_id PK
        string requisition_id FK
        string skill_id FK
        string requirement_type
    }
    JOB_REQUISITIONS ||--o{ REQUISITION_SKILLS : "requisition_id"
    SKILLS ||--o{ REQUISITION_SKILLS : "skill_id"
    PERFORMANCE_METRICS_AGGREGATE {
        string metric_id PK
        string team_id FK
        date month
        int headcount
        float cases_handled
        float avg_handle_time_min
        float avg_csat
        float sla_met_rate
    }
    TEAMS ||--o{ PERFORMANCE_METRICS_AGGREGATE : "team_id"
```

## B. Scholarly & Health Publishing Operations

```mermaid
erDiagram
    INSTITUTIONS {
        string institution_id PK
        string institution_name
        string institution_type
        string country
        string research_tier
    }
    AUTHORS {
        string author_id PK
        string first_name
        string last_name
        string full_name
        string author_ref_id
        string country
        string primary_institution_id FK
        int h_index
    }
    INSTITUTIONS ||--o{ AUTHORS : "primary_institution_id"
    AUTHOR_AFFILIATIONS {
        string affiliation_id PK
        string author_id FK
        string institution_id FK
        bool is_primary
        int start_year
        float end_year
    }
    AUTHORS ||--o{ AUTHOR_AFFILIATIONS : "author_id"
    INSTITUTIONS ||--o{ AUTHOR_AFFILIATIONS : "institution_id"
    JOURNALS {
        string journal_id PK
        string journal_title
        string subject_area
        string imprint
        string impact_tier
        string open_access_model
        int launch_year
        int issues_per_year
    }
    TEAMS ||--o{ JOURNALS : "managing_team_id"
    AUTHORS ||--o{ JOURNALS : "editor_in_chief_author_id"
    MANUSCRIPTS {
        string manuscript_id PK
        string journal_id FK
        string corresponding_author_id FK
        string handling_editor_author_id FK
        string ops_coordinator_employee_id FK
        string article_type
        string subject_area
        string topic
    }
    JOURNALS ||--o{ MANUSCRIPTS : "journal_id"
    AUTHORS ||--o{ MANUSCRIPTS : "corresponding_author_id"
    AUTHORS ||--o{ MANUSCRIPTS : "handling_editor_author_id"
    EMPLOYEES ||--o{ MANUSCRIPTS : "ops_coordinator_employee_id"
    PEER_REVIEW_ASSIGNMENTS {
        string assignment_id PK
        string manuscript_id FK
        string reviewer_author_id FK
        datetime invited_at
        datetime responded_at
        string response
        datetime due_at
        datetime review_submitted_at
    }
    MANUSCRIPTS ||--o{ PEER_REVIEW_ASSIGNMENTS : "manuscript_id"
    AUTHORS ||--o{ PEER_REVIEW_ASSIGNMENTS : "reviewer_author_id"
    RESEARCH_PAPERS_PUBLISHED {
        string paper_id PK
        string manuscript_id FK
        string journal_id FK
        date published_date
        string doi
        string title
        string abstract
        string keywords
    }
    MANUSCRIPTS ||--o{ RESEARCH_PAPERS_PUBLISHED : "manuscript_id"
    JOURNALS ||--o{ RESEARCH_PAPERS_PUBLISHED : "journal_id"
    INSTITUTIONS ||--o{ RESEARCH_PAPERS_PUBLISHED : "institution_id"
    PAPER_AUTHORS {
        string paper_author_id PK
        string paper_id FK
        string author_id FK
        int author_position
        bool is_corresponding
        string affiliation_institution_id FK
    }
    RESEARCH_PAPERS_PUBLISHED ||--o{ PAPER_AUTHORS : "paper_id"
    AUTHORS ||--o{ PAPER_AUTHORS : "author_id"
    INSTITUTIONS ||--o{ PAPER_AUTHORS : "affiliation_institution_id"
    CITATIONS {
        string citation_id PK
        string citing_paper_id FK
        string cited_paper_id FK
        int citation_year
        string context_section
    }
    RESEARCH_PAPERS_PUBLISHED ||--o{ CITATIONS : "citing_paper_id"
    RESEARCH_PAPERS_PUBLISHED ||--o{ CITATIONS : "cited_paper_id"
    CONTENT_PRODUCTION_JOBS {
        string job_id PK
        string paper_id FK
        string stage
        int stage_order
        string team_id FK
        string vendor_name
        datetime started_at
        datetime completed_at
    }
    RESEARCH_PAPERS_PUBLISHED ||--o{ CONTENT_PRODUCTION_JOBS : "paper_id"
    TEAMS ||--o{ CONTENT_PRODUCTION_JOBS : "team_id"
    EMPLOYEES ||--o{ CONTENT_PRODUCTION_JOBS : "assignee_employee_id"
    XML_CONVERSION_DEFECTS {
        string defect_id PK
        string job_id FK
        string paper_id FK
        string defect_type
        string severity
        datetime detected_at
        string detected_by
        datetime fixed_at
    }
    CONTENT_PRODUCTION_JOBS ||--o{ XML_CONVERSION_DEFECTS : "job_id"
    RESEARCH_PAPERS_PUBLISHED ||--o{ XML_CONVERSION_DEFECTS : "paper_id"
    RESEARCH_INTEGRITY_FLAGS {
        string flag_id PK
        string paper_id FK
        string flag_type
        string manuscript_id FK
        datetime flagged_at
        string detected_by
        string status
        string assigned_employee_id FK
    }
    RESEARCH_PAPERS_PUBLISHED ||--o{ RESEARCH_INTEGRITY_FLAGS : "paper_id"
    MANUSCRIPTS ||--o{ RESEARCH_INTEGRITY_FLAGS : "manuscript_id"
    EMPLOYEES ||--o{ RESEARCH_INTEGRITY_FLAGS : "assigned_employee_id"
```

## C. Legal & Professional Content Operations

```mermaid
erDiagram
    JURISDICTIONS {
        string jurisdiction_id PK
        string jurisdiction_name
        string jurisdiction_code
        string legal_system
        string region
        string official_language
    }
    COURTS {
        string court_id PK
        string jurisdiction_id FK
        string court_name
        string court_level
        string court_code
    }
    JURISDICTIONS ||--o{ COURTS : "jurisdiction_id"
    PRACTICE_AREAS {
        string practice_area_id PK
        string practice_area_name
        string practice_group
    }
    LEGAL_DOCUMENTS {
        string doc_id PK
        string doc_type
        string jurisdiction_id FK
        string practice_area_id FK
        string court_id FK
        date decision_or_enacted_date
        string title
        string citation_ref
    }
    JURISDICTIONS ||--o{ LEGAL_DOCUMENTS : "jurisdiction_id"
    COURTS ||--o{ LEGAL_DOCUMENTS : "court_id"
    PRACTICE_AREAS ||--o{ LEGAL_DOCUMENTS : "practice_area_id"
    LEGAL_CITATIONS {
        string legal_citation_id PK
        string citing_doc_id FK
        string cited_doc_id FK
        string treatment
        date citation_date
    }
    LEGAL_DOCUMENTS ||--o{ LEGAL_CITATIONS : "citing_doc_id"
    LEGAL_DOCUMENTS ||--o{ LEGAL_CITATIONS : "cited_doc_id"
    EDITORIAL_TASKS {
        string task_id PK
        string doc_id FK
        string task_type
        string team_id FK
        string editor_employee_id FK
        datetime created_at
        bool ai_assisted
        string model_id FK
    }
    LEGAL_DOCUMENTS ||--o{ EDITORIAL_TASKS : "doc_id"
    TEAMS ||--o{ EDITORIAL_TASKS : "team_id"
    EMPLOYEES ||--o{ EDITORIAL_TASKS : "editor_employee_id"
    AI_MODELS ||--o{ EDITORIAL_TASKS : "model_id"
    REGULATORY_UPDATES {
        string update_id PK
        string jurisdiction_id FK
        string practice_area_id FK
        string source_body
        string update_type
        datetime published_at
        date effective_date
        datetime captured_at
    }
    JURISDICTIONS ||--o{ REGULATORY_UPDATES : "jurisdiction_id"
    PRACTICE_AREAS ||--o{ REGULATORY_UPDATES : "practice_area_id"
    REGULATORY_UPDATE_IMPACTS {
        string impact_id PK
        string update_id FK
        string doc_id FK
        int sla_hours
        datetime content_updated_at
        float latency_hours
        bool sla_breached
        string editor_employee_id FK
    }
    REGULATORY_UPDATES ||--o{ REGULATORY_UPDATE_IMPACTS : "update_id"
    LEGAL_DOCUMENTS ||--o{ REGULATORY_UPDATE_IMPACTS : "doc_id"
    EMPLOYEES ||--o{ REGULATORY_UPDATE_IMPACTS : "editor_employee_id"
```

## D. Risk & Business Analytics Operations

```mermaid
erDiagram
    BUSINESS_ENTITIES {
        string entity_id PK
        string legal_name
        string registration_number
        string country
        string industry
        string entity_type
        date incorporation_date
        string employee_band
    }
    OWNERSHIP_LINKS {
        string ownership_link_id PK
        string parent_entity_id FK
        string child_entity_id FK
        float ownership_pct
        string link_type
        date effective_date
    }
    BUSINESS_ENTITIES ||--o{ OWNERSHIP_LINKS : "parent_entity_id"
    BUSINESS_ENTITIES ||--o{ OWNERSHIP_LINKS : "child_entity_id"
    INDIVIDUALS {
        string individual_id PK
        string first_name
        string last_name
        date date_of_birth
        string nationality
        string gender
        string occupation
        datetime created_at
    }
    ADDRESSES {
        string address_id PK
        string individual_id FK
        string address_line
        string city
        string country
        string postal_code
        string address_type
        date valid_from
    }
    INDIVIDUALS ||--o{ ADDRESSES : "individual_id"
    IDENTITY_ATTRIBUTES {
        string attribute_id PK
        string individual_id FK
        string attribute_type
        string attribute_value_hash
        bool verified
        string verification_method
        datetime verified_at
    }
    INDIVIDUALS ||--o{ IDENTITY_ATTRIBUTES : "individual_id"
    DEVICES {
        string device_id PK
        string individual_id FK
        string device_fingerprint
        string device_type
        string os
        datetime first_seen_at
        datetime last_seen_at
        string ip_country
    }
    INDIVIDUALS ||--o{ DEVICES : "individual_id"
    ACCOUNTS {
        string account_id PK
        string holder_type
        string individual_id FK
        string entity_id FK
        string client_customer_id FK
        string account_type
        string currency
        datetime opened_at
    }
    INDIVIDUALS ||--o{ ACCOUNTS : "individual_id"
    BUSINESS_ENTITIES ||--o{ ACCOUNTS : "entity_id"
    CUSTOMERS ||--o{ ACCOUNTS : "client_customer_id"
    TRANSACTIONS {
        string txn_id PK
        string account_id FK
        string counterparty_account_id FK
        string device_id FK
        string channel
        string merchant_category
        string currency
        float amount
    }
    ACCOUNTS ||--o{ TRANSACTIONS : "account_id"
    ACCOUNTS ||--o{ TRANSACTIONS : "counterparty_account_id"
    DEVICES ||--o{ TRANSACTIONS : "device_id"
    WATCHLISTS {
        string watchlist_entry_id PK
        string subject_type
        string individual_id FK
        string entity_id FK
        string list_type
        string list_source
        date listed_date
        string reason
    }
    INDIVIDUALS ||--o{ WATCHLISTS : "individual_id"
    BUSINESS_ENTITIES ||--o{ WATCHLISTS : "entity_id"
    ALERT_RULES {
        string rule_id PK
        string rule_name
        string rule_type
        float threshold
        string model_id FK
        string owner_team_id FK
        date created_date
    }
    AI_MODELS ||--o{ ALERT_RULES : "model_id"
    TEAMS ||--o{ ALERT_RULES : "owner_team_id"
    RISK_ALERTS {
        string alert_id PK
        string rule_id FK
        string txn_id FK
        string account_id FK
        datetime created_at
        float score
        bool is_false_positive
        string disposition
    }
    ALERT_RULES ||--o{ RISK_ALERTS : "rule_id"
    TRANSACTIONS ||--o{ RISK_ALERTS : "txn_id"
    ACCOUNTS ||--o{ RISK_ALERTS : "account_id"
    EMPLOYEES ||--o{ RISK_ALERTS : "analyst_employee_id"
    KYC_CASES {
        string kyc_case_id PK
        string client_customer_id FK
        string subject_type
        string subject_individual_id FK
        string subject_entity_id FK
        string case_type
        datetime opened_at
        string analyst_employee_id FK
    }
    CUSTOMERS ||--o{ KYC_CASES : "client_customer_id"
    INDIVIDUALS ||--o{ KYC_CASES : "subject_individual_id"
    BUSINESS_ENTITIES ||--o{ KYC_CASES : "subject_entity_id"
    EMPLOYEES ||--o{ KYC_CASES : "analyst_employee_id"
    INVESTIGATIONS {
        string investigation_id PK
        string alert_id FK
        string kyc_case_id FK
        string lead_analyst_employee_id FK
        datetime opened_at
        datetime closed_at
        float time_to_decision_hours
        string outcome
    }
    RISK_ALERTS ||--o{ INVESTIGATIONS : "alert_id"
    KYC_CASES ||--o{ INVESTIGATIONS : "kyc_case_id"
    EMPLOYEES ||--o{ INVESTIGATIONS : "lead_analyst_employee_id"
    ANALYST_ACTIONS {
        string action_id PK
        string investigation_id FK
        int sequence_no
        string action_type
        datetime action_ts
        string analyst_employee_id FK
        float duration_min
        string tool_used
    }
    INVESTIGATIONS ||--o{ ANALYST_ACTIONS : "investigation_id"
    EMPLOYEES ||--o{ ANALYST_ACTIONS : "analyst_employee_id"
```

## E. Exhibitions & Events

```mermaid
erDiagram
    EVENTS {
        string event_id PK
        string industry
        string city
        string country
        date start_date
        date end_date
        string event_name
        string venue
    }
    TEAMS ||--o{ EVENTS : "organizer_team_id"
    EVENT_SESSIONS {
        string session_id PK
        string event_id FK
        string track
        string title
        datetime start_ts
        int capacity
    }
    EVENTS ||--o{ EVENT_SESSIONS : "event_id"
    EXHIBITORS {
        string exhibitor_id PK
        string event_id FK
        string entity_id FK
        string package_tier
        int booth_size_sqm
        float contract_value_usd
        date signed_date
        string account_manager_employee_id FK
    }
    EVENTS ||--o{ EXHIBITORS : "event_id"
    BUSINESS_ENTITIES ||--o{ EXHIBITORS : "entity_id"
    EMPLOYEES ||--o{ EXHIBITORS : "account_manager_employee_id"
    VISITORS {
        string visitor_id PK
        string first_name
        string last_name
        string job_title
        string company_entity_id FK
        string country
        string email_domain_hash
        datetime created_at
    }
    BUSINESS_ENTITIES ||--o{ VISITORS : "company_entity_id"
    REGISTRATIONS {
        string registration_id PK
        string visitor_id FK
        string event_id FK
        datetime registered_at
        string ticket_type
        bool attended
        datetime checked_in_at
    }
    VISITORS ||--o{ REGISTRATIONS : "visitor_id"
    EVENTS ||--o{ REGISTRATIONS : "event_id"
    BADGE_SCANS {
        string scan_id PK
        string registration_id FK
        string exhibitor_id FK
        datetime scan_ts
        string scan_type
    }
    REGISTRATIONS ||--o{ BADGE_SCANS : "registration_id"
    EXHIBITORS ||--o{ BADGE_SCANS : "exhibitor_id"
    LEADS {
        string lead_id PK
        string exhibitor_id FK
        string visitor_id FK
        string event_id FK
        string scan_id FK
        datetime captured_at
        int lead_score
        string lead_status
    }
    EXHIBITORS ||--o{ LEADS : "exhibitor_id"
    VISITORS ||--o{ LEADS : "visitor_id"
    EVENTS ||--o{ LEADS : "event_id"
    BADGE_SCANS ||--o{ LEADS : "scan_id"
    CUSTOMERS ||--o{ LEADS : "converted_customer_id"
    SESSION_ATTENDANCE {
        string attendance_id PK
        string registration_id FK
        string session_id FK
        datetime checked_in_at
    }
    REGISTRATIONS ||--o{ SESSION_ATTENDANCE : "registration_id"
    EVENT_SESSIONS ||--o{ SESSION_ATTENDANCE : "session_id"
    EVENT_FEEDBACK {
        string feedback_id PK
        string registration_id FK
        string event_id FK
        int nps
        int satisfaction
        string comment
        datetime submitted_at
    }
    REGISTRATIONS ||--o{ EVENT_FEEDBACK : "registration_id"
    EVENTS ||--o{ EVENT_FEEDBACK : "event_id"
```

## F. Customer Service & Support

```mermaid
erDiagram
    PRODUCTS {
        string product_id PK
        string product_name
        string division_id FK
        string product_line
        string pricing_model
        date launch_date
        bool is_ai_enabled
        float list_price_usd
    }
    DIVISIONS ||--o{ PRODUCTS : "division_id"
    SUBSCRIPTIONS {
        string subscription_id PK
        string customer_id FK
        string product_id FK
        date start_date
        date end_date
        int seats
        float annual_value_usd
        string currency
    }
    CUSTOMERS ||--o{ SUBSCRIPTIONS : "customer_id"
    PRODUCTS ||--o{ SUBSCRIPTIONS : "product_id"
    CUSTOMERS {
        string customer_id PK
        string segment
        string institution_id FK
        string entity_id FK
        string customer_name
        string country
        string region
        string primary_division_id FK
    }
    INSTITUTIONS ||--o{ CUSTOMERS : "institution_id"
    BUSINESS_ENTITIES ||--o{ CUSTOMERS : "entity_id"
    DIVISIONS ||--o{ CUSTOMERS : "primary_division_id"
    EMPLOYEES ||--o{ CUSTOMERS : "account_owner_employee_id"
    CHURN_EVENTS {
        string churn_id PK
        string customer_id FK
        date churn_date
        string primary_subscription_id FK
        string churn_reason
        float arr_lost_usd
    }
    CUSTOMERS ||--o{ CHURN_EVENTS : "customer_id"
    SUBSCRIPTIONS ||--o{ CHURN_EVENTS : "primary_subscription_id"
    PRODUCT_USAGE_MONTHLY {
        string usage_id PK
        string subscription_id FK
        string customer_id FK
        string product_id FK
        date usage_month
        int active_users
        int sessions
        int searches
    }
    SUBSCRIPTIONS ||--o{ PRODUCT_USAGE_MONTHLY : "subscription_id"
    CUSTOMERS ||--o{ PRODUCT_USAGE_MONTHLY : "customer_id"
    PRODUCTS ||--o{ PRODUCT_USAGE_MONTHLY : "product_id"
    SUPPORT_CASES {
        string case_id PK
        string customer_id FK
        string product_id FK
        string division_id FK
        string team_id FK
        string agent_employee_id FK
        string channel
        string category
    }
    CUSTOMERS ||--o{ SUPPORT_CASES : "customer_id"
    PRODUCTS ||--o{ SUPPORT_CASES : "product_id"
    DIVISIONS ||--o{ SUPPORT_CASES : "division_id"
    TEAMS ||--o{ SUPPORT_CASES : "team_id"
    EMPLOYEES ||--o{ SUPPORT_CASES : "agent_employee_id"
    KNOWLEDGE_ARTICLES ||--o{ SUPPORT_CASES : "kb_article_id"
    CASE_INTERACTIONS {
        string interaction_id PK
        string case_id FK
        int sequence_no
        string channel
        string direction
        string author_type
        string employee_id FK
        datetime interaction_ts
    }
    SUPPORT_CASES ||--o{ CASE_INTERACTIONS : "case_id"
    EMPLOYEES ||--o{ CASE_INTERACTIONS : "employee_id"
    FEATURE_REQUESTS {
        string feature_request_id PK
        string customer_id FK
        string product_id FK
        string case_id FK
        datetime submitted_at
        string title
        int votes
        string status
    }
    CUSTOMERS ||--o{ FEATURE_REQUESTS : "customer_id"
    PRODUCTS ||--o{ FEATURE_REQUESTS : "product_id"
    SUPPORT_CASES ||--o{ FEATURE_REQUESTS : "case_id"
    PROJECTS ||--o{ FEATURE_REQUESTS : "linked_project_id"
    RENEWAL_OPPORTUNITIES {
        string renewal_opportunity_id PK
        string subscription_id FK
        string customer_id FK
        date renewal_due_date
        float forecast_value_usd
        string owner_employee_id FK
        string stage
        string outcome
    }
    SUBSCRIPTIONS ||--o{ RENEWAL_OPPORTUNITIES : "subscription_id"
    CUSTOMERS ||--o{ RENEWAL_OPPORTUNITIES : "customer_id"
    EMPLOYEES ||--o{ RENEWAL_OPPORTUNITIES : "owner_employee_id"
```

## G. Finance Shared Services

```mermaid
erDiagram
    COST_CENTERS {
        string cost_center_id PK
        string department_id FK
        string division_id FK
        string cost_center_name
        string site_id FK
    }
    DEPARTMENTS ||--o{ COST_CENTERS : "department_id"
    DIVISIONS ||--o{ COST_CENTERS : "division_id"
    SITES ||--o{ COST_CENTERS : "site_id"
    SUPPLIERS {
        string supplier_id PK
        string entity_id FK
        string supplier_name
        string category
        string country
        int payment_terms_days
        string risk_tier
        bool preferred
    }
    BUSINESS_ENTITIES ||--o{ SUPPLIERS : "entity_id"
    SUPPLIER_ENROLLMENT_REQUESTS {
        string enrollment_request_id PK
        string supplier_id FK
        string requested_by_employee_id FK
        datetime submitted_at
        bool documents_complete_first_pass
        bool tax_document_ok
        bool bank_details_ok
        bool sanctions_screen_ok
    }
    SUPPLIERS ||--o{ SUPPLIER_ENROLLMENT_REQUESTS : "supplier_id"
    EMPLOYEES ||--o{ SUPPLIER_ENROLLMENT_REQUESTS : "requested_by_employee_id"
    PURCHASE_ORDERS {
        string po_id PK
        string supplier_id FK
        string cost_center_id FK
        string requester_employee_id FK
        string approver_employee_id FK
        date po_date
        string currency
        float po_amount
    }
    SUPPLIERS ||--o{ PURCHASE_ORDERS : "supplier_id"
    COST_CENTERS ||--o{ PURCHASE_ORDERS : "cost_center_id"
    EMPLOYEES ||--o{ PURCHASE_ORDERS : "requester_employee_id"
    EMPLOYEES ||--o{ PURCHASE_ORDERS : "approver_employee_id"
    INVOICES {
        string invoice_id PK
        string supplier_id FK
        string po_id FK
        string currency
        date invoice_date
        float net_amount
        float tax_amount
        float gross_amount
    }
    SUPPLIERS ||--o{ INVOICES : "supplier_id"
    PURCHASE_ORDERS ||--o{ INVOICES : "po_id"
    EMPLOYEES ||--o{ INVOICES : "processor_employee_id"
    INVOICE_LINES {
        string invoice_line_id PK
        string invoice_id FK
        int line_no
        string description
        float quantity
        float unit_price
        float line_amount
        string gl_account
    }
    INVOICES ||--o{ INVOICE_LINES : "invoice_id"
    COST_CENTERS ||--o{ INVOICE_LINES : "cost_center_id"
    INVOICE_EXCEPTIONS {
        string exception_id PK
        string invoice_id FK
        string exception_type
        datetime raised_at
        datetime resolved_at
        string resolver_employee_id FK
        string resolution
    }
    INVOICES ||--o{ INVOICE_EXCEPTIONS : "invoice_id"
    EMPLOYEES ||--o{ INVOICE_EXCEPTIONS : "resolver_employee_id"
    PAYMENTS {
        string payment_id PK
        string invoice_id FK
        datetime paid_at
        float amount
        string currency
        string method
        string payment_run_id
        int days_vs_due
    }
    INVOICES ||--o{ PAYMENTS : "invoice_id"
    OPEX_BUDGET_VS_ACTUAL {
        string opex_row_id PK
        string cost_center_id FK
        string division_id FK
        date month
        float budget_php
        float actual_php
        float variance_php
        float variance_pct
    }
    COST_CENTERS ||--o{ OPEX_BUDGET_VS_ACTUAL : "cost_center_id"
    DIVISIONS ||--o{ OPEX_BUDGET_VS_ACTUAL : "division_id"
```

## H. Technology & IT Operations

```mermaid
erDiagram
    APPLICATIONS {
        string app_id PK
        string app_name
        string division_id FK
        string owner_team_id FK
        string purpose
        string criticality
        string hosting
        string tech_stack
    }
    DIVISIONS ||--o{ APPLICATIONS : "division_id"
    TEAMS ||--o{ APPLICATIONS : "owner_team_id"
    CHANGES {
        string change_id PK
        string app_id FK
        string change_type
        string requested_by_employee_id FK
        datetime requested_at
        datetime approved_at
        datetime implemented_at
        string risk_level
    }
    APPLICATIONS ||--o{ CHANGES : "app_id"
    EMPLOYEES ||--o{ CHANGES : "requested_by_employee_id"
    PROBLEMS {
        string problem_id PK
        string app_id FK
        string root_cause_category
        string root_cause_summary
        datetime opened_at
        datetime closed_at
        bool known_error
    }
    APPLICATIONS ||--o{ PROBLEMS : "app_id"
    IT_TICKETS {
        string ticket_id PK
        string ticket_type
        string app_id FK
        string requester_employee_id FK
        string assignment_group_team_id FK
        string assignee_employee_id FK
        string priority
        datetime created_at
    }
    APPLICATIONS ||--o{ IT_TICKETS : "app_id"
    EMPLOYEES ||--o{ IT_TICKETS : "requester_employee_id"
    TEAMS ||--o{ IT_TICKETS : "assignment_group_team_id"
    EMPLOYEES ||--o{ IT_TICKETS : "assignee_employee_id"
    KNOWLEDGE_ARTICLES ||--o{ IT_TICKETS : "kb_article_id"
    INCIDENTS {
        string incident_id PK
        string ticket_id FK
        string app_id FK
        string severity
        datetime started_at
        datetime detected_at
        datetime resolved_at
        int impacted_users
    }
    IT_TICKETS ||--o{ INCIDENTS : "ticket_id"
    APPLICATIONS ||--o{ INCIDENTS : "app_id"
    CHANGES ||--o{ INCIDENTS : "caused_by_change_id"
    PROBLEMS ||--o{ INCIDENTS : "problem_id"
    ACCESS_REQUESTS {
        string access_request_id PK
        string requester_employee_id FK
        string app_id FK
        string access_type
        string justification
        datetime requested_at
        datetime completed_at
        string status
    }
    EMPLOYEES ||--o{ ACCESS_REQUESTS : "requester_employee_id"
    APPLICATIONS ||--o{ ACCESS_REQUESTS : "app_id"
    ACCESS_REQUEST_APPROVALS {
        string approval_id PK
        string access_request_id FK
        int step_no
        string approval_step
        string approver_employee_id FK
        datetime assigned_at
        datetime decided_at
        string decision
    }
    ACCESS_REQUESTS ||--o{ ACCESS_REQUEST_APPROVALS : "access_request_id"
    EMPLOYEES ||--o{ ACCESS_REQUEST_APPROVALS : "approver_employee_id"
    SYSTEM_EVENTS {
        string system_event_id PK
        string app_id FK
        datetime event_ts
        string event_type
        string severity
        int latency_ms
        string error_code
        string host
    }
    APPLICATIONS ||--o{ SYSTEM_EVENTS : "app_id"
    EMPLOYEES ||--o{ SYSTEM_EVENTS : "user_employee_id"
```

## I. Process Intelligence (Process Mining)

```mermaid
erDiagram
    PROCESS_DEFINITIONS {
        string process_id PK
        string process_name
        string division_id FK
        string owner_department_id FK
        string source_table
        int sla_hours
        bool has_event_log
        string standard_path
    }
    DIVISIONS ||--o{ PROCESS_DEFINITIONS : "division_id"
    DEPARTMENTS ||--o{ PROCESS_DEFINITIONS : "owner_department_id"
    PROCESS_ACTIVITIES {
        string activity_id PK
        string process_id FK
        string activity_name
        int standard_sequence
        bool is_manual
        int rule_based_pct
        int standard_effort_min
    }
    PROCESS_DEFINITIONS ||--o{ PROCESS_ACTIVITIES : "process_id"
    PROCESS_EVENT_LOG {
        string event_id PK
        string case_id
        string process_id FK
        string activity
        string activity_id FK
        datetime event_ts
        string resource_employee_id FK
        string system_app_id FK
    }
    PROCESS_DEFINITIONS ||--o{ PROCESS_EVENT_LOG : "process_id"
    PROCESS_ACTIVITIES ||--o{ PROCESS_EVENT_LOG : "activity_id"
    EMPLOYEES ||--o{ PROCESS_EVENT_LOG : "resource_employee_id"
    APPLICATIONS ||--o{ PROCESS_EVENT_LOG : "system_app_id"
    AUTOMATION_CANDIDATES {
        string candidate_id PK
        string process_id FK
        string activity_id FK
        string activity_name
        int annual_volume_2023
        int avg_effort_min
        float annual_hours
        int rule_based_pct
    }
    PROCESS_DEFINITIONS ||--o{ AUTOMATION_CANDIDATES : "process_id"
    PROCESS_ACTIVITIES ||--o{ AUTOMATION_CANDIDATES : "activity_id"
```

## J. AI, Automation & Transformation Portfolio

```mermaid
erDiagram
    AI_MODELS {
        string model_id PK
        string model_type
        string model_name
        string provider
        string hosting
        string owner_team_id FK
        string risk_classification
        date created_date
    }
    TEAMS ||--o{ AI_MODELS : "owner_team_id"
    MODEL_VERSIONS {
        string model_version_id PK
        string model_id FK
        string version
        date released_date
        float eval_accuracy
        float eval_hallucination_rate
        string status
    }
    AI_MODELS ||--o{ MODEL_VERSIONS : "model_id"
    AI_USE_CASES {
        string use_case_id PK
        string use_case_name
        string division_id FK
        string process_id FK
        string archetype
        string stage
        string primary_kpi
        string owner_team_id FK
    }
    DIVISIONS ||--o{ AI_USE_CASES : "division_id"
    PROCESS_DEFINITIONS ||--o{ AI_USE_CASES : "process_id"
    TEAMS ||--o{ AI_USE_CASES : "owner_team_id"
    EMPLOYEES ||--o{ AI_USE_CASES : "sponsor_employee_id"
    EMPLOYEES ||--o{ AI_USE_CASES : "product_owner_employee_id"
    AI_MODELS ||--o{ AI_USE_CASES : "model_id"
    AI_USE_CASE_KPIS {
        string kpi_id PK
        string use_case_id FK
        string kpi_name
        float baseline_value
        float current_value
        date measured_date
    }
    AI_USE_CASES ||--o{ AI_USE_CASE_KPIS : "use_case_id"
    AI_GOVERNANCE_REVIEWS {
        string review_id PK
        string use_case_id FK
        string review_type
        string reviewer_employee_id FK
        datetime submitted_at
        datetime completed_at
        string status
        int findings_count
    }
    AI_USE_CASES ||--o{ AI_GOVERNANCE_REVIEWS : "use_case_id"
    EMPLOYEES ||--o{ AI_GOVERNANCE_REVIEWS : "reviewer_employee_id"
    PROJECTS {
        string project_id PK
        string project_type
        string use_case_id FK
        string owner_team_id FK
        string division_id FK
        string pm_employee_id FK
        string project_name
        date start_date
    }
    AI_USE_CASES ||--o{ PROJECTS : "use_case_id"
    TEAMS ||--o{ PROJECTS : "owner_team_id"
    DIVISIONS ||--o{ PROJECTS : "division_id"
    EMPLOYEES ||--o{ PROJECTS : "pm_employee_id"
    PROJECT_MEMBERS {
        string project_member_id PK
        string project_id FK
        string employee_id FK
        string project_role
        int allocation_pct
    }
    PROJECTS ||--o{ PROJECT_MEMBERS : "project_id"
    EMPLOYEES ||--o{ PROJECT_MEMBERS : "employee_id"
    PROJECT_TASKS {
        string task_id PK
        string project_id FK
        string assignee_employee_id FK
        string title
        datetime created_at
        date due_date
        float estimate_hours
        datetime completed_at
    }
    PROJECTS ||--o{ PROJECT_TASKS : "project_id"
    EMPLOYEES ||--o{ PROJECT_TASKS : "assignee_employee_id"
    MILESTONES {
        string milestone_id PK
        string project_id FK
        string milestone_name
        date planned_date
        date actual_date
        string status
    }
    PROJECTS ||--o{ MILESTONES : "project_id"
    PROJECT_RISKS {
        string risk_id PK
        string project_id FK
        string category
        string description
        int likelihood
        int impact
        string status
        string owner_employee_id FK
    }
    PROJECTS ||--o{ PROJECT_RISKS : "project_id"
    EMPLOYEES ||--o{ PROJECT_RISKS : "owner_employee_id"
    INNOVATION_IDEAS {
        string idea_id PK
        string submitted_by_employee_id FK
        string team_id FK
        string title
        string description
        datetime submitted_at
        int votes
        string status
    }
    EMPLOYEES ||--o{ INNOVATION_IDEAS : "submitted_by_employee_id"
    TEAMS ||--o{ INNOVATION_IDEAS : "team_id"
    AI_USE_CASES ||--o{ INNOVATION_IDEAS : "linked_use_case_id"
    AI_USAGE_EVENTS {
        string usage_event_id PK
        string employee_id FK
        string tool
        datetime event_ts
        string use_case_id FK
        string model_id FK
        string task_type
        int prompt_tokens
    }
    EMPLOYEES ||--o{ AI_USAGE_EVENTS : "employee_id"
    AI_USE_CASES ||--o{ AI_USAGE_EVENTS : "use_case_id"
    AI_MODELS ||--o{ AI_USAGE_EVENTS : "model_id"
    PROMPTS_LIBRARY {
        string prompt_id PK
        string author_employee_id FK
        string task_type
        string use_case_id FK
        string title
        string prompt_text
        datetime created_at
        float rating_avg
    }
    EMPLOYEES ||--o{ PROMPTS_LIBRARY : "author_employee_id"
    AI_USE_CASES ||--o{ PROMPTS_LIBRARY : "use_case_id"
    AI_FEEDBACK {
        string ai_feedback_id PK
        string usage_event_id FK
        string employee_id FK
        int rating
        string feedback_type
        string comment
        datetime submitted_at
    }
    AI_USAGE_EVENTS ||--o{ AI_FEEDBACK : "usage_event_id"
    EMPLOYEES ||--o{ AI_FEEDBACK : "employee_id"
```

## K. Knowledge & Collaboration (Unstructured)

```mermaid
erDiagram
    KNOWLEDGE_ARTICLES {
        string article_id PK
        string article_type
        string topic_key
        string division_id FK
        string product_id FK
        string app_id FK
        string title
        string owner_team_id FK
    }
    DIVISIONS ||--o{ KNOWLEDGE_ARTICLES : "division_id"
    PRODUCTS ||--o{ KNOWLEDGE_ARTICLES : "product_id"
    APPLICATIONS ||--o{ KNOWLEDGE_ARTICLES : "app_id"
    TEAMS ||--o{ KNOWLEDGE_ARTICLES : "owner_team_id"
    EMPLOYEES ||--o{ KNOWLEDGE_ARTICLES : "author_employee_id"
    KNOWLEDGE_ARTICLE_VERSIONS {
        string article_version_id PK
        string article_id FK
        int version_no
        datetime edited_at
        string edited_by_employee_id FK
        string change_summary
    }
    KNOWLEDGE_ARTICLES ||--o{ KNOWLEDGE_ARTICLE_VERSIONS : "article_id"
    EMPLOYEES ||--o{ KNOWLEDGE_ARTICLE_VERSIONS : "edited_by_employee_id"
    SOPS {
        string sop_id PK
        string article_id FK
        string process_id FK
        string sop_title
        int version
        date effective_date
        date review_due_date
        bool is_current
    }
    KNOWLEDGE_ARTICLES ||--o{ SOPS : "article_id"
    PROCESS_DEFINITIONS ||--o{ SOPS : "process_id"
    EMPLOYEES ||--o{ SOPS : "owner_employee_id"
    DOCUMENTS {
        string document_id PK
        string project_id FK
        string doc_type
        string author_employee_id FK
        datetime created_at
        string title
        string body
    }
    PROJECTS ||--o{ DOCUMENTS : "project_id"
    EMPLOYEES ||--o{ DOCUMENTS : "author_employee_id"
    MEETINGS {
        string meeting_id PK
        string project_id FK
        string team_id FK
        string organizer_employee_id FK
        string meeting_type
        string title
        datetime start_ts
        int duration_min
    }
    PROJECTS ||--o{ MEETINGS : "project_id"
    TEAMS ||--o{ MEETINGS : "team_id"
    EMPLOYEES ||--o{ MEETINGS : "organizer_employee_id"
    ACTION_ITEMS {
        string action_item_id PK
        string meeting_id FK
        string owner_employee_id FK
        string description
        date due_date
        datetime completed_at
        string status
    }
    MEETINGS ||--o{ ACTION_ITEMS : "meeting_id"
    EMPLOYEES ||--o{ ACTION_ITEMS : "owner_employee_id"
    CHAT_CHANNELS {
        string channel_id PK
        string team_id FK
        string project_id FK
        string channel_name
        datetime created_at
    }
    TEAMS ||--o{ CHAT_CHANNELS : "team_id"
    PROJECTS ||--o{ CHAT_CHANNELS : "project_id"
    CHAT_MESSAGES {
        string message_id PK
        string channel_id FK
        string sender_employee_id FK
        datetime sent_at
        string message_text
        bool is_taglish
        string reply_to_message_id FK
        int mentions_count
    }
    CHAT_CHANNELS ||--o{ CHAT_MESSAGES : "channel_id"
    EMPLOYEES ||--o{ CHAT_MESSAGES : "sender_employee_id"
    CHAT_MESSAGES ||--o{ CHAT_MESSAGES : "reply_to_message_id"
    EMAILS {
        string email_id PK
        string sender_employee_id FK
        string recipient_employee_id FK
        int cc_count
        datetime sent_at
        string subject
        string body
        string related_case_id FK
    }
    EMPLOYEES ||--o{ EMAILS : "sender_employee_id"
    EMPLOYEES ||--o{ EMAILS : "recipient_employee_id"
    SUPPORT_CASES ||--o{ EMAILS : "related_case_id"
    SEARCH_LOGS {
        string search_id PK
        string employee_id FK
        datetime searched_at
        string query_text
        int results_count
        string clicked_article_id FK
        string source
    }
    EMPLOYEES ||--o{ SEARCH_LOGS : "employee_id"
    KNOWLEDGE_ARTICLES ||--o{ SEARCH_LOGS : "clicked_article_id"
```
