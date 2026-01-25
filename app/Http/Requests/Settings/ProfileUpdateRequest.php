<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            
            'gender' => ['nullable', 'string', 'in:L,P'],
            'tempat_lahir' => ['nullable', 'string', 'max:255'],
            'tanggal_lahir' => ['nullable', 'date'],
            'nik' => ['nullable', 'string', 'max:20'],
            'wa' => ['nullable', 'string', 'max:20'],
            'domicile' => ['nullable', 'string', 'max:255'],
            'alamat_lengkap' => ['nullable', 'string'],
            'occupation' => ['nullable', 'string', 'max:255'],

            'educations' => ['nullable', 'array'],
            'educations.*.level' => ['required', 'string'],
            'educations.*.university' => ['nullable', 'string'],
            'educations.*.faculty' => ['nullable', 'string'],
            'educations.*.major' => ['nullable', 'string'],
            'educations.*.admission_year' => ['nullable', 'numeric'],
            'educations.*.graduation_year' => ['nullable', 'numeric'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }
}
