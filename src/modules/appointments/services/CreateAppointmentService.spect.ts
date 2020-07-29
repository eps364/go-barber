import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmetsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const dateAppointment = new Date(2025, 10, 10, 11);

    const appointment = await createAppointmentService.execute({
      date: dateAppointment,
      provider_id: '12345',
    });
    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 10, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '12412141212',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '12412141212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
