describe("Blog app", function () {
  describe("when user is not logged in", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000");
    });
    it("only login button is shown", function () {
      cy.get("button")
        .should("contain", "Login")
        .should("not.contain", "username")
        .should("not.contain", "password");
    });
    it("clicking the login button shows the login form", function () {
      cy.contains("Login").click();
      cy.get(".togglableContent")
        .should("contain", "Login to application")
        .should("contain", "username")
        .should("contain", "password");
    });
    it("clicking the cancel button closes the form", function () {
      cy.contains("Login").click();
      cy.contains("cancel").click();
      cy.get("button")
        .should("contain", "Login")
        .should("not.contain", "username")
        .should("not.contain", "password");
    });
  });

  describe("Login", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/testing/reset");
      const user = {
        name: "superuser",
        username: "root",
        password: "salainen",
      };

      const user2 = {
        name: "other user",
        username: "user2",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.request("POST", "http://localhost:3003/api/users/", user2);
      cy.visit("http://localhost:3000");
    });

    it("succeeds with correct credentials", function () {
      cy.contains("Login").click();
      cy.get("[data-cy='username']").type("root");
      cy.get("[data-cy='password']").type("salainen");
      cy.contains("login").click();
      cy.get("#root")
        .should("contain", "blogs")
        .should("contain", "superuser")
        .should("contain", "logout")
        .should("contain", "New Blog")
        .should("not.contain", "login");
    });
    it("fails with wrong credentials", function () {
      cy.contains("Login").click();
      cy.get("[data-cy='username']").type("root");
      cy.get("[data-cy='password']").type("safasfasf");
      cy.contains("login").click();
      cy.get(".error")
        .should("contain", "Wrong Credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });

    describe("when logged in", function () {
      beforeEach(function () {
        cy.login({ username: "root", password: "salainen" });
        cy.contains("New Blog").click();
      });
      it("clicking the new blog button shows the new blog form", function () {
        cy.get("[data-cy='blog-form']")
          .should("contain", "title")
          .should("contain", "author")
          .should("contain", "url");
      });
      it("clicking cancel closes the new blog form", function () {
        cy.contains("cancel").click();
        cy.contains("New Blog").should("not.contain", "title");
      });
      it("a new blog can be created", function () {
        cy.get("[data-cy='title']").type("blog title");
        cy.get("[data-cy='author']").type("blog author");
        cy.get("[data-cy='url']").type("blog url");
        cy.get("[data-cy='create-button']").click();

        cy.get("[data-cy='blog']")
          .should("contain", "blog title")
          .should("contain", "blog author")
          .should("contain", "View");

        cy.get(".success")
          .should("contain", "a new blog blog title by blog author added")
          .and("have.css", "color", "rgb(0, 128, 0)")
          .and("have.css", "border-style", "solid");
      });
      describe("and several blogs exist", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "blog title 1",
            author: "blog author 1",
            url: "blog url 1",
          });
          cy.createBlog({
            title: "blog title 2",
            author: "blog author 2",
            url: "blog url 2",
            likes: 2,
          });
          cy.contains("logout").click();
          cy.login({ username: "user2", password: "salainen" });
          cy.createBlog({
            title: "blog title 3",
            author: "blog author 3",
            url: "blog url 3",
            likes: 3,
          });
          cy.contains("logout").click();
          cy.login({ username: "root", password: "salainen" });
        });
        it("Clicking the view button shows the blog details", function () {
          cy.contains("blog title 1").as("firstBlog");
          cy.get("@firstBlog").contains("View").click();
          cy.get("@firstBlog").should("contain", "blog title 1");
          cy.get("@firstBlog").should("contain", "blog url 1");
          cy.get("@firstBlog").contains("View").click();
          cy.get("@firstBlog").should("contain", "blog title 1");
          cy.get("@firstBlog").should("not.contain", "blog url 1");
        });
        it("clicking the likes button increments the like count", function () {
          cy.contains("blog title 1").as("firstBlog");
          cy.get("@firstBlog").contains("View").click();

          cy.get("@firstBlog").should("contain", "likes: 0");
          cy.contains("like").click();
          cy.get("@firstBlog").should("contain", "likes: 1");
        });
        it("clicking the likes button increments the like count", function () {
          cy.contains("blog title 1").as("firstBlog");
          cy.get("@firstBlog").contains("View").click();

          cy.get("@firstBlog").should("contain", "likes: 0");
          cy.contains("like").click();
          cy.get("@firstBlog").should("contain", "likes: 1");
        });
        it("clicking the remove button deletes the blog", function () {
          cy.contains("blog title 1").as("firstBlog");
          cy.get("@firstBlog").contains("View").click();

          cy.get("@firstBlog").should("contain", "likes: 0");
          cy.contains("remove").click();

          cy.get("[data-cy='blog']").should("not.contain", "blog title 1");
        });
        it("delete button is not rendered on another user's blog entries", function () {
          cy.contains("blog title 3").as("thirdBlog");
          cy.get("@thirdBlog").contains("View").click();

          cy.get("@thirdBlog")
            .should("contain", "likes: 3")
            .should("not.contain", "remove");
        });
        it("blogs are ordered according to like count", function () {
          cy.get("[data-cy='blog']").eq(0).should("contain", "blog title 3");
          cy.get("[data-cy='blog']").eq(2).should("contain", "blog title 1");
        });
      });
    });
  });
});
