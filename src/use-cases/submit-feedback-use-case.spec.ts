import { SubmitFeedbackUseCase } from './submit-feedback-use-case'

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('shoud be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,adwdn1o2n31oien19dn2d2',
      })
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('shoud not be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,adwdn1o2n31oien19dn2d2',
      })
    ).rejects.toThrow()
  })

  it('shoud not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,adwdn1o2n31oien19dn2d2',
      })
    ).rejects.toThrow()
  })

  it('shoud not be able to submit with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'adwdn1o2n31oien19dn2d2.jpg',
      })
    ).rejects.toThrow()
  })
})
