describe('Shareif Test', () => {

  it('Visits the app', () => {
    cy.visit('/')
    cy.contains('Shareif');
  })

  it('Upload text', () => {
    cy.visit('/')
    cy.get('textarea').type('Chuck Norris makes onions cry.');
    cy.get('button').click();
  })

  it('Open text url on new page', () => {
    const text = 'Hello world';
    cy.visit('/')
    cy.get('textarea').type(text);
    cy.get('button').click();
    cy
      .get('input')
      .invoke('val')
      .then(url => {
        cy.visit(<string>url);
        cy.contains(text);
      });
  })


})
