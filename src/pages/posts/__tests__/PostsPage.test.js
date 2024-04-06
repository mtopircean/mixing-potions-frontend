import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import PostsPage from '../PostsPage';

jest.mock('axios');

describe('PostsPage Component', () => {
  test('renders posts, body system panel, and most liked users', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' }
    ];

    axios.get.mockResolvedValueOnce({ data: { results: mockPosts } });

    const isLoggedIn = true;

    const { findByText, queryByText } = render(
      <MemoryRouter>
        <PostsPage isLoggedIn={isLoggedIn} />
      </MemoryRouter>
    );

    /* Check if each post is rendered */
    await expect(findByText('Post 1')).toBeDefined();
    await expect(findByText('Post 2')).toBeDefined();

   /* Check if body system panel is rendered */
    await expect(findByText('Body System Panel')).toBeDefined();

    /* Check if most liked users panel is rendered */
    await expect(findByText('Most Liked Users')).toBeDefined();

    /* Check if "Follow" button is displayed only when user is logged in */
    if (isLoggedIn) {
      expect(queryByText('Follow')).toBeDefined();
    } else {
      expect(queryByText('Follow')).toBeNull();
    }
  });
});
