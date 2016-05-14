Feature: User Authentication

  Scenario: Existing User Can Visit Home Page

    Given I have an existing account
    When I go to root path
    Then I should see "Log In"

  Scenario: Existing User Can Log In

    Given I have an existing account
    When I go to root path
    And I click "Log In"
    And I fill in "login_name" with "Test"
    And I fill in "login_password" with "password"
    And I click_button "Login"
    Then I should see "Hello, Test"
