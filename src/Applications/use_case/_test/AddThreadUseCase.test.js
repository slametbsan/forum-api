const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const mockReturnAddThread = new AddThreadUseCase({
      id: 'thread-123',
      title: 'this is title of thread',
      owner: 'user-123',
    });
    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(mockReturnAddThread));

    const useCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const useCasePayload = {
      title: 'this is title of thread',
      body: 'this is body of thread',
      owner: 'user-123',
    };

    const expectedAddThread = new AddThreadUseCase({
      id: 'thread-123',
      title: 'this is title of thread',
      owner: 'user-123',
    });

    // Action
    const adddThread = await useCase.execute(useCasePayload);

    // Assert
    expect(adddThread).toEqual(expectedAddThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload);
  });
});
