# Workflow: Review Submission Forms

## Objective
Build the authenticated forms for submitting reviews and adding new professors.

## Execution Steps
1. Build the Submit a Review Page (`/dosen/[id]/ulasan/baru`):
   - Must require authentication.
   - Form fields: Course autocomplete, Rating (1-5 stars), Difficulty (1-5), Would Take Again (toggle), Grade (dropdown), Tags (multi-select pills), Body (min 20, max 500 chars).
2. Build the Add a Professor Page (`/tambah-dosen`):
   - Fields: Full name, University (dropdown), Department (dropdown), NIDN.
3. Build the necessary POST/PATCH API routes for reviews and upvotes.
4. **Validation:** Run an automated browser test simulating a user submitting a review to verify the form submission works.