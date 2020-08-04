import check from '../index';

test('Sign verified', () => {
  expect(
    check({
      url:'https://ban.su/service/red.html?vk_access_token_settings=notify&vk_app_id=7518087&vk_are_notifications_enabled=0&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_user_id=102343170&sign=y6WRJ2gcXgvcrHC5fR9RsTptEzUL14zPWs3iX3fk0mc',
      key:'btoLEj2VqxDIRIKSp6GZ'
    }),
  ).toBe(true);
});
