from django.test import SimpleTestCase


class CategoryPageTests(SimpleTestCase):
    def test_category_page_renders_with_expected_container_and_script(self):
        response = self.client.get('/categoryes/')

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'id="category-container"')
        self.assertContains(response, 'javascript/category.js')
