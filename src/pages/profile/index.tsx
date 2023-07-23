import { observer, useObservable, enableLegendStateReact } from "@legendapp/state/react"
import ExtraInfo from "./extra-info"
import ProfileInfo from "./profile"
import ProfileEdit from "./profile-edit"

export interface IProfileView {
	handleSwitchView: () => void
}

const Profile = observer(function Component() {
	const state = useObservable({
		isEditProfile: false,
	})

	const handleState = (): void => {
		state.isEditProfile.set(v => !v)
	}

	return <div className="text-white">
		{!state.isEditProfile.get() &&
			<>
				<ProfileInfo handleSwitchView={handleState} />
				<ExtraInfo />
			</>
		}
		{state.isEditProfile.get() && <ProfileEdit handleSwitchView={handleState} />}

	</div>
})

export default Profile