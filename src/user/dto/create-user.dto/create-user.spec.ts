import { CreateUserDto } from './create-user.dto';

describe('CreateUser', () => {
  it('should be defined', () => {
    expect(new CreateUserDto()).toBeDefined();
  });
});
