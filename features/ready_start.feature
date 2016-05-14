Feature: Ready And Start Game

  @javascript
  Scenario: User Should Be Ready And Start Game

    Given I have a Test Environment
    And I have a Game with Players Created
    And I have a User Logged In
    When I click "Join"
    And I wait 2 seconds
    And I click "Ready" within ".my-game"
    And I wait 5 seconds
    Then I should see "Card Count:"
