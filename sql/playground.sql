select *
from session;

select *
from user;


delete from session
where id = 'clw49gnog0007hej88oe5wyyg';


-- I want all of the sessions that are related to specific user and that are not connected to the current active routine
select *
from session as s
left join routine as r
on s.routine_id = r.id
where s.user_id = 'clw3v31uo00005hyignh0oukl'
AND s.routine_id IS NULL OR
    s.routine_id != (select id from routine where r.is_active = true and r.id = 'clw3v31uo00005hyignh0oukl')


select session_days_active.day
from session
left join session_days_active
on session.id = session_days_active.session_id
where session.name LIKE 'hi';


-- get a list of all sessions that are related to a active routine
select *
from routine
left join session
on routine.id = session.routine_id
left join session_days_active
on session.id = session_days_active.session_id
where routine.is_active = true;



-- get a session with all related workouts
select *
from session
left join workout
on session.id = workout.session_id
where session.user_id = 'clx6v20pe0000k8dxf46pewgo'