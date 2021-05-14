import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useHttpDispatch } from "app/shared/store/httpRequestActions";
import { getSingleOpponent, updateOpponentRequest } from "app/opponents/OpponentApi";
import CardForm from "library/card-form/CardForm";
import css from "app/opponents/profile/opponent-profile.module.scss";
import CardFormTitle from "library/card-form/CardFormTitle";
import CardFormContent from "library/card-form/CardFormContent";
import OpponentForm from "app/opponents/form/OpponentForm";
import { SaveOpponentRequest } from "app/opponents/__models/OpponentModels";
import { useRedux } from "store/rootReducer";
import useTranslations from "app/locale/__hooks/useTranslations";
import OpponentProfileStats from "app/opponents/profile/stats/OpponentProfileStats";
import OpponentData from "app/opponents/profile/data/OpponentData";
import Button from "library/button/Button";

const OpponentProfile: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [opponentNameError, setOpponentNameError] = useState("");
    const [existingUserNameError, setExistingUserNameError] = useState("");
    const history = useHistory();
    const { id } = useParams();
    const { translate } = useTranslations();
    const dispatch = useHttpDispatch();
    const { opponent, stats } = useRedux(state => state.opponent.single) ?? {};
    const isCurrentUser = opponent?.linkedUser?.status === "LINKED_WITH_CREATOR" ?? false;

    useEffect(() => {
        getSingleOpponent(dispatch, { id: +id! });
    }, [dispatch, id]);

    const onSubmit = async (request: SaveOpponentRequest) => {
        try {
            setExistingUserNameError("");
            setOpponentNameError("");
            await updateOpponentRequest(dispatch, +id!, request);
            onCancel();
        } catch (e) {
            const code = JSON.parse(e).code;
            const errorText = translate(`OPPONENTS.ADD.ERRORS.${code}`);
            const inputWithError = code === "OPPONENT_ALREADY_EXISTS" ? setOpponentNameError : setExistingUserNameError;
            inputWithError(errorText);
        }
    };
    const onCancel = () => {
        history.go(0);
    };

    return (
        <CardForm className={css.cardWrapper}>
            <CardFormTitle>
                {translate("OPPONENTS.PROFILE.TITLE")} <span className={css.opponentName}>{opponent?.name}</span>
            </CardFormTitle>
            <div className={css.contentWrapper}>
                <CardFormContent className={css.formWrapper}>
                    {editing && (
                        <OpponentForm
                            onSubmit={onSubmit}
                            onCancel={onCancel}
                            initialValue={opponent}
                            opponentNameError={opponentNameError}
                            existingUserNameError={existingUserNameError}
                        />
                    )}
                    {!editing && <OpponentData opponent={opponent} />}
                    {!editing && !isCurrentUser && (
                        <Button
                            text={translate("OPPONENTS.PROFILE.EDIT")}
                            onClick={() => setEditing(!editing)}
                            decoration="outlined"
                            className={css.editButton}
                        />
                    )}
                </CardFormContent>
                <div className={css.divider} />
                <div className={css.statsWrapper}>
                    <OpponentProfileStats stats={stats} />
                </div>
            </div>
        </CardForm>
    );
};

export default OpponentProfile;
