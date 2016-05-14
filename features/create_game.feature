Feature: Create Game

  @javascript
  Scenario: User Should Be Able To Create Game

    Given I have a Test Environment
    And I have a User Logged In
    When I click "add"
    And I fill in "game_name" with "test game"
    And I click_button "Create Game"
    Then I should see "test game"
