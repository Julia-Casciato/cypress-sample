class website {
    // buttons
    validateResumeButton(file, button) {
        cy.get('.d-flex > .btn-outline-light').should('be.visible')
        cy.get('.d-flex > .btn-outline-light').should('have.attr', 'href', file)
        cy.get('.d-flex > .btn-outline-light').should('have.text', button)
        return this
    }
    clickResumeButton() {
        cy.get('.d-flex > .btn-outline-light').click()
        return this
    }
    validateHireMeMenu(link, button) {
        cy.get('#navbarCollapse > a').should('be.visible')
        cy.get('#navbarCollapse > a').should('have.attr', 'href', link)
        cy.get('#navbarCollapse > a').should('have.text', button)
        return this
    }
    clickHireMeMenu() {
        return cy.get('#navbarCollapse > a').click()
    }
    validateHireMeAbout(link, button) {
        cy.get('.col-lg-7 > a[href="#contact"]').should('be.visible')
        cy.get('.col-lg-7 > a[href="#contact"]').should('have.attr', 'href', link)
        cy.get('.col-lg-7 > a[href="#contact"]').should('have.text', button)
        return this
    }
    clickHireMeAbout() {
        return cy.get('.col-lg-7 > a[href="#contact"]').click()
    }
    // menu
    validateMenu(button) {
        cy.get('nav').should('be.visible')
        cy.get('.navbar-brand > h1')
            .should('have.text', 'JuliaCasciato')
        cy.get('.navbar-nav > a')
            .should('have.length', 6)
        cy.get('a[href="#home"]').should('have.text', 'Home')
        cy.get('a[href="#about"]').should('have.text', 'About')
        cy.get('a[href="#qualification"]').should('have.text', 'Experience')
        cy.get('a[href="#skill"]').should('have.text', 'Skills')
        cy.get('a[href="#certificate"]').should('have.text', 'Certificates')
        cy.get('.navbar-nav > a[href="#contact"]').should('have.text', 'Contact')
        cy.get('#navbarCollapse > a')
            .should('have.text', button)
        return this
    }
    clickMenuItem(menu) {
        cy.get('.navbar-nav > a[href="#' + menu + '"]').click()
        cy.get('#' + menu + '').should('be.visible')
        return this
    }
    // sections
    scrollToSection(section) {
        return cy.get('#' + section + '').scrollIntoView()
    }
    validateSectionURL(section) {
        return cy.url().should('include', section)
    }
    verifyTitles(section, title1, title2) {
        cy.get('#' + section + ' > .container > .position-relative > .display-1').should('have.text', title1)
        cy.get('#' + section + ' > .container > .position-relative > .position-absolute').should('have.text', title2)
        return this
    }
    // experience section
    getColumnTitles(column1, column2) {
        cy.get(':nth-child(1) > h3.mb-4').should('have.text', column1)
        cy.get('#qualification > .container > .row > :nth-child(2) > h3.mb-4').should('have.text', column2)
        return this
    }
    getExperienceDots(jobs) {
        return cy.get('.fa-dot-circle').should('have.length', jobs)
    }
    // skills section
    getSkillsIcons() {
        cy.get(':nth-child(1) > .position-relative > .justify-content-center > .fa').should('be.visible')
        cy.get(':nth-child(2) > .position-relative > .justify-content-center > .fa').should('be.visible')
        cy.get(':nth-child(3) > .position-relative > .justify-content-center > .fa').should('be.visible')
        return this
    }
    getSkillsCategories(category1, category2, category3){
        cy.get(':nth-child(1) > .position-relative > .mb-4')
            .should('be.visible')
            .and('have.text', category1)
        cy.get(':nth-child(2) > .position-relative > .mb-4')
            .should('be.visible')
            .and('have.text', category2)
        cy.get(':nth-child(3) > .position-relative > .mb-4')
            .should('be.visible')
            .and('have.text', category3)
        return this
    }
    // certificate section
    getCertificateCount(count) {
        return cy.get('#certificate > .container > .row > div').should('have.length', count)
    }
    clickCertificateLink() {
        cy.get('#certificate > .container > .row').find('a').each(($el) => {
            cy.wrap($el).should('have.attr', 'href')
        })
        return this
    }
    // contact form
    validateContactForm() {
        cy.get('#full-name')
            .should('have.attr', 'placeholder', 'Your Name')
            .and('have.attr', 'required', 'required')
        cy.get('#email-address')
            .should('have.attr', 'placeholder', 'Your Email')
            .and('have.attr', 'required', 'required')
        cy.get('#message')
            .should('have.attr', 'placeholder', 'Message')
            .and('have.attr', 'required', 'required')
        cy.get('button[type="submit"]')
            .should('be.visible')
            .and('include.text', 'Send Message')
        return this
    }
    submitContactForm(name, email, message) {
        cy.get('#full-name').type(name)
        cy.get('#email-address').type(email)
        cy.get('#message').type(message)
        cy.get('button[type="submit"]').click()
        return this
    }
    // footer
    verifyFooterLinks() {
        cy.get('.btn-social').each(($el) => {
            cy.request($el.attr('href'))
                .its('status')
                .should('eq', 200)
        })
        return this
    }

} export default website