Feature: Join Game

  @javascript
  Scenario: User Should Be Able To Join Game

    Given I have a Test Environment
    And I have a Game Created
    And I have a User Logged In
    When I click "Join"
    And I wait 2 seconds
    Then I should see "Not Ready"
