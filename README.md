# Find a Friend.

## Functional Requirements:

- [x] It should be able to register a pet;
- [x] It should be able to list all pets available for adoption in a city;
- [x] It should be able to filter pets by its characteristcs;
- [x] It should be able to view details about a pet for adoption;
- [ ] It should be able to register as an ORG;
- [ ] It should be able to login as an ORG;

## Business Rules:

- [ ] The client cannot list pets before inform a city;
- [ ] The client must specify the address and WhatsApp number for register an ORG;
- [x] A pet must be owned by an ORG;
- [ ] The user who wants to adopt must be contact to an ORG via WhatsApp;
- [x] All filters for searching for pets execept city are optional;
- [ ] For an ORG to access the application as admin it needs to be logged;

## Non-Functional Requirements:

- [ ] The ORG password must be hashed (encrypted);
- [x] The application data should be stored in a PostgreSQL database;
- [x] The city and state fields should be stored in uppercase on database;
- [x] All resource list must be paginated by 20 items per page;
