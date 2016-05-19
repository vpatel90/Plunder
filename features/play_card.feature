Feature: Play Card

  @javascript
  Scenario: User Should Be Able To Play a Card

    Given I have a Test Environment
    And I have a two player game
    And I have a User Logged In
    When I visit game show path
    And I wait 3 seconds
    And I play the card with "#card1" ID
    And I confirm by clicking ".done-btn" within "#card1"
    Then I wait 3 seconds
    And I find ".ship-card"
