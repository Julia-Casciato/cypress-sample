/// <reference types="Cypress" />
import website from "../support/pageObjects/website"
const ws = new website()

let site
before(function() {
    /* fixture data */
    cy.fixture('website.json')
        .then(fwebsite => {
            site = fwebsite
        })
})

describe('My Personal Website', function() {
    /* Feature: My Personal Website
        Test case: User can download resume
        Test case: User can navigate using top menu
        Test case: User can click Hire Me button in About
        Test case: User can click Hire Me button in menu
        Test case: User can view About section
        Test case: User can view Experience section
        Test case: User can view Skills section
        Test case: User can view Certificate section
        Test case: User can view Contact section
        Test case: User can fill in Contact Me form
    */

    beforeEach(function() {
        /* test data */
        const aboutSection = site.about.id
        const contactSection = site.contact.id
        const linkHireMe = site.hireMe.href
        const buttonHireMe = site.hireMe.button
        cy.wrap(aboutSection).as('aboutSection')
        cy.wrap(contactSection).as('contactSection')
        cy.wrap(linkHireMe).as('linkHireMe')
        cy.wrap(buttonHireMe).as('buttonHireMe')

        // When user navigates to the website
        cy.intercept('GET', '/').as('siteLoads')
        cy.visit('/')
        cy.wait('@siteLoads', {requestTimeout: 30000})
            .its('response.statusCode')
            .should('be.oneOf', [200, 302])
    })

    it('User can download resume', function(){
        /* Scenario: User can download resume
            When user navigates to the website (beforeEach)
            And clicks the Download Resume buttom
            Then the resume opens in a new tab
        */

        const button = site.resume.button
        const file = site.resume.file

        // And clicks the Download Resume buttom
        ws.validateResumeButton(file, button)
        ws.clickResumeButton()

        // Then the resume opens in a new tab
            // this checks the link returns a 200 status
        cy.request(file)
            .its('status')
            .should('eq', 200)
    })
    
    it('User can navigate using top menu', function(){
        /* Scenario: User can navigate using top menu
            When user navigates to the website (beforeEach)
            And scrolls to view the menu
            And clicks each menu item
            Then user is directed to each menu section
        */
        const button = site.hireMe.button

        // And scrolls to view the menu
        cy.scrollTo('center')
        ws.validateMenu(button)

        // And clicks each menu item
        // Then user is directed to each menu section
        ws.clickMenuItem('contact')
        ws.clickMenuItem('certificate')
        ws.clickMenuItem('skill')
        ws.clickMenuItem('qualification')
        ws.clickMenuItem('about')
        ws.clickMenuItem('home')
    })

    it('User can click Hire Me button in menu', function(){
        /* Scenario: User can click Hire Me button in About
            When user navigates to the website (beforeEach)
            And scrolls to see the Hire Me button in menu
            And clicks the button
            Then user is directed to the Contact section
        */

        // And scrolls to see the Hire Me button in menu
        cy.scrollTo('center')
        ws.validateHireMeMenu(this.linkHireMe, this.buttonHireMe)

        // And clicks the button
        ws.clickHireMeMenu()
        cy.wait(2000)

        // Then user is directed to the Contact section
        ws.validateSectionURL(this.contactSection)
    })

    it('User can click Hire Me button in About', function(){
        /* Scenario: User can click Hire Me button in About
            When user navigates to the website (beforeEach)
            And scrolls to the Hire Me button in About
            And clicks the button
            Then user is directed to the Contact section
        */

        // And scrolls to the Hire Me button in About
        ws.scrollToSection(this.aboutSection)

        // And clicks the button
        ws.clickHireMeAbout()

        // Then user is directed to the Contact section
        ws.validateSectionURL(this.contactSection)
    })

    it('User can view About section', function() {
        /* Scenario: User can view About section
            When user navigates to the website (beforeEach)
            And goes to the About section
            Then the user sees the section titles
            And the Hire Me button
        */

        const title1 = site.about.title1
        const title2 = site.about.title2

        // And goes to the About section
        ws.scrollToSection(this.aboutSection)

        // Then the user sees the section titles
        ws.verifyTitles(this.aboutSection, title1, title2)

        // And the Hire Me button
        ws.validateHireMeAbout(this.linkHireMe, this.buttonHireMe)
    })

    it('User can view Experience section', function() {
        /* Scenario: User can view Experience section
            When user navigates to the website (beforeEach)
            And goes to the Experience section
            Then the user sees the section titles
            And the two columns appear with their data
        */

        const section = site.experience.id
        const title1 = site.experience.title1
        const title2 = site.experience.title2
        const column1 = site.experience.column1
        const column2 = site.experience.column2
        const jobs = site.experience.jobs

        // And goes to the Experience section
        ws.scrollToSection(section)

        // Then the user sees the section titles
        ws.verifyTitles(section, title1, title2)

        // And the two columns appear with their data
        ws.getColumnTitles(column1, column2)
        ws.getExperienceDots(jobs)
    })

    it('User can view Skills section', function() {
        /* Scenario: User can view Skills section
            When user navigates to the website (beforeEach)
            And goes to the Skills section
            Then the user sees the section titles
            And the three categories and icons
        */

        const section = site.skills.id
        const title1 = site.skills.title1
        const title2 = site.skills.title2
        const category1 = site.skills.category.one
        const category2 = site.skills.category.two
        const category3 = site.skills.category.three

        // And goes to the Skills section
        ws.scrollToSection(section)

        // Then the user sees the section titles
        ws.verifyTitles(section, title1, title2)

        // And the three categories and icons
        ws.getSkillsIcons()
        ws.getSkillsCategories(category1, category2, category3)

    })

    it('User can view Certificate section', function() {
        /* Scenario: User can view Certificate section
            When user navigates to the website (beforeEach)
            And goes to the Certificate section
            Then the user sees the section titles
            And the certificates appear with their links
        */

        const section = site.certificate.id
        const title1 = site.certificate.title1
        const title2 = site.certificate.title2
        const count = site.certificate.count

        // And goes to the Certificate section
        ws.scrollToSection(section)

        // Then the user sees the section titles
        ws.verifyTitles(section, title1, title2)

        // And the certificates
        ws.getCertificateCount(count)
        ws.clickCertificateLink()
    })

    it('User can view Contact section', function() {
        /* Scenario: User can view Contact section
            When user navigates to the website (beforeEach)
            And goes to the Contact section
            Then the user sees the Contact section
        */

        const title1 = site.contact.title1
        const title2 = site.contact.title2

        // And goes to the About section
        ws.scrollToSection(this.contactSection)

        // Then the user sees the section titles
        ws.verifyTitles(this.contactSection, title1, title2)

        // And the Contact form
        ws.validateContactForm()
    })

    it('User can fill in Contact Me form', function(){
        /* Scenario: User can fill in Contact Me form
            When user navigates to the website (beforeEach)
            And goes to the Contact section
            Then they can type in all fields
        */

        const name = site.contact.form.name
        const email = site.contact.form.email
        const message = site.contact.form.message
        const url = site.contact.form.url

        // And goes to the Contact section
        ws.scrollToSection(this.contactSection)

        // Then they can type in all fields
        ws.submitContactForm(name, email, message)
    })
})